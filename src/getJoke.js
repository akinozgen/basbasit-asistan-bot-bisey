export function getJoke() {
    const jokes = [
        "Sinüs 60. kosinüs tutmuş.",
        "Bebeğin birine tır çarpmış ama ölmemiş, neden? Çünkü bebeğin bezi bariyerliymiş.",
        "Uçak düşmüş ama kimse ölmemiş, neden? Çünkü uçak, Pamukbank'ın üstüne düşmüş.",
        "Bebeğe patik giydirmeye çalışmışlar ama giymemiş neden? Bebek antipatikmiş.",
        "Gökdelenin tepesinden adamın kafasına radyo düşmüş ama adama bir şey olmamış neden? Radyo hafif müzik çalıyormuş",
        "Hangi çiçek hem kafaya takılıp hem çamaşır yıkanır? Fesleğen",
        "Masada hangi örtü kullanılmaz? Bitki Örtüsü.",
        "İshal olmuş böceğe ne denir? CIRCIR böceği.",
        "Küçük su birikintisine ne denir? Sucuk.",
        "En güzel çay hangi dağda içilir? Çay bardağında.",
        "Temel kahvede işe başlar, müşterilerden biri seslenir: Temel bize üç çay, biri açık olsun. Hangisi?",
        "Hayırlı olsun Araba almışsın. Evet aldık. Niye Araba aldın ki kendine alsaydın."
    ];

    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
}
