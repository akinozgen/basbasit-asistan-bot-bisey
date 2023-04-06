### basbasit-asistan-bot-bisey

IOS kestirmeler uygulamasından yapılacak çağrılara sesli cevap vermesi amacıyla geliştirilmiş bir asistan botudur. Kullanıcıdan sorgu metni ve konum bilgisi alır. Önceden belirlenmiş bazı komutlar için özel cevaplar vardır. Konum bilgisi ile Openweathermap API'si kullanılarak hava durumu bilgisi alınır.

Özel komutlar:

- `hava nasıl`: hava durumu bilgisi verir.
- `saat kaç`: saat bilgisi verir.
- `bugün günlerden ne`: tarih bilgisi verir.
- `şaka yap`: rastgele bir şaka söyler.
- `trendler`: twitter günün trendleri verir.
- `gpt`: gpt-3 ile mesajlaşma (eklenecek).
- `kalkanlar devrede mi`: Daha sonra eklenecek belirli websitelerinin durumunu kontrol eder.
- `durum raporu ver`: Fonksiyonel olmayan bir komuttur. Aktif olup olmadığını kontrol etmek için kullanılabilir.

---

## Geliştirme

template.example.yaml dosyası template.yaml dosyasına kopyalanarak kullanılabilir. Duruma göre AWS lambda olarak kullanılacaksa package.json içerisindeki `iosShortcutsResponder` ismi ve `eu-west-2` olan bölge değeri de fonksiyonunuza göre değiştirilmelidir.

`template.yaml` dosyasında doldurulması gereken değerler:

- `CHAT_ID`: Telegram botu için grup chati ID'si
- `TELEGRAM_API_KEY`: Telegram botu için API key
- `WEATHER_API_KEY`: Openweathermap API key
- `OPENAI_API_KEY`: OpenAI API key

```bash
# aws cli ve sam cli kurulumu (linux-x86_64)
pip install aws-sam-cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version # aws-cli kurulumunu doğrulayın
sam --version # sam-cli kurulumunu doğrulayın
```

```bash
mv template.example.yaml template.yaml
# kurulum ve çalıştırma
npm install
npm run start
```

---

## Çalışma Şekli ve Çalıştırılacak Özel Komut

`index.js` dosyasındaki `responseTexts` objesinin anahtar değerleri özel komutlardır. Özel komutlara özel cevaplar vermek için bu objeye yeni değerler eklenebilir. Her anahtar virgül ile ayrılmış beklenen komutları içerir. Her değer de asenkron olabilecek bir fonksiyon içerir. **Virgül karakterinden önce veya sonra kesinlikle** boşluk eklenmemelidir. Örneğin `hava nasıl` komutu için `responseTexts` objesine aşağıdaki gibi bir değer eklenir:

```javascript
const responseTexts = {
  // ...

  'hava nasıl,bugün hava nasıl,sıcaklık nasıl,sıcaklık,hava durumu': async () =>
    await getWeather(lat, lng),

  // ...
};

// Burada getWeather fonksiyonunun "Hava parçalı bulutlu ve sıcaklık 25 derece" gibi bir değer döndürmesi beklenir.
```

Gönderilecek her `q` değeri için basit bir skor hesaplaması yapılarak olabilecek en yakın anahtar değeri bulunur. `getPromptScore` fonksiyonu gönderilen istekteki `q` parametresini `responseTexts` objesinin anahtar değerlerine karşılık skorlarını hesaplar. En yüksek skora sahip anahtar değeri döndürülür. Bu değer `responseTexts` objesindeki değerdir.

Skor hesaplaması için `q` içindeki her kelime ayrıştırılır. Daha sonra `responseTexts` objesindeki anahtar değerlerinin her biri de kendi içindeki virgül karakterinden ayrılır. Daha sonra elde edilen anahtarlar da boşluk karakterinden kelimelerine ayrılır ve `levenshtein` algoritması kullanılarak skor hesaplanır. Her anahtar için bu skorlar toplanır ve `[ { "anahtarDegeri(string)": skor(number) }, ... ]` şeklinde bir obje dizisi olarak döndürülür.

En yüksek skora sahip anahtar değeri fonksiyon içerdiğinden `responseTexts` objesindeki değer çalıştırılır.

##### Skor Hesaplanması Sonrası Örnek Sonuç

```text
Gönderilen Değer: bugün havalar nasıl?
En Uygun Aday: 'hava nasıl,bugün hava nasıl,sıcaklık nasıl,sıcaklık,hava durumu'
```

Daha sonra `responseTexts` içerisindeki `hava nasıl,bugün hava nasıl,sıcaklık nasıl,sıcaklık,hava durumu` anahtarına sahip fonksiyon çalıştırılır.

---

### HTTP İstekleri

İstekler raw json, veya get parametreleri ile gönderilebilir. Zorunlu parametreler `q` ve `lat` ve `lon`.
Her istek parametresi `getVariable` fonksiyonuyla alınır. `event` ve istenen alanın değeri olan `key` şeklinde aşağıdaki gibi iki parametre alır.

```javascript
getVariable(event, 'q');
```

- `q`: sorgu metni. istenilen cevabın bir parçasını içermesi yeterlidir.
- `lat`: konumun enlem bilgisi
- `lon`: konumun boylam bilgisi

```bash
# POST isteği örneği
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"q": "hava nasıl", "lat": "40.01384", "lon": "40.94966"}' \
    http://localhost:3004

# GET isteği örneği
curl -X GET \
    -H "Content-Type: application/json" \
    "http://localhost:3004?q=hava%20nasıl&lat=40.01384&lon=40.94966"
```
