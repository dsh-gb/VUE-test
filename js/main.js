import waterImg from '../media/img/water.jpg';
const url = "https://www.cbr-xml-daily.ru/daily_json.js";

document.body.style.backgroundImage = `url(${waterImg})`;

const formatDate = (str, separat) => { // ф-я форматирования даты формата yyyy-mm-dd в формат dd-mm-yyyy
    let date = new Date(str);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return date = mm + separat + dd + separat + yyyy;
};

const app = new Vue({
    el: '#app',
    data: {
        title: 'Vue lesson page',
        date: new Date().toISOString().slice(0, 19).replace(/T/, ' / '),
        curs: {
            date: 'dd-mm-yyyy',
            USD: 0,
            EUR: 0
        }
    },
    mounted() {
        setInterval(() => {
            this.getNow()
        }, 1000);
        this.getCurs();
    },
    methods: {
        getNow() {
            return this.date = new Date().toISOString().slice(0, 19).replace(/T/, ' / ')
        },
        getCurs() {
            fetch(url) //fetch - это функция, которая выполняет ajax запрос и возвращает объект promice
                .then(data => { // data - ответ fetch
                    return data.json(); //json - метод, который парсит json строку и возращает объект промиса
                })
                .then(data => { // data - обьект JS
                    console.log(data);
                    this.curs.date = formatDate(data.Timestamp.substring(0, 10), '-');
                    this.curs.USD = +data.Valute.USD.Value.toFixed(2);
                    this.curs.EUR = +data.Valute.EUR.Value.toFixed(2);
                })
                .catch(error => {
                    console.error("fetch error: ", error);
                });
            return this.curs;
        }
    }
})
