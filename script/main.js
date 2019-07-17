const btnNewReq = document.querySelector(".button")
const btnClosed = document.querySelector('.fa-times')
const btnCreatVisit = document.querySelector('.btn-creat-request')
const selectDoctor = document.querySelector('#select-doctor')
const forms = document.querySelectorAll('.form-request')
const request_doctor = document.querySelector(".apply_to_doctor")
const wrapRequestDoctor = document.querySelector('.wrap-form-apply-doctor')
const inputForm = document.querySelectorAll('.input-form')
const board = document.querySelector('.board')
const notFound = document.querySelector('.not-found ')
let seriaBoard

let active_doctor
let doc
let surname
let name
let patronymic
let age
let purposeOfVisit
let comments
let heartPressure
let indexMass
let disease
let lastVisit

let visitTherapist
let visitCardiologist
let visitDentist
let boardVisit = []
///////////////////////////////////
loadDataLocalSt()
//////////// C_L_A_S_S ////////////
class Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments) {
        this._idUser = `${surname}${name}`
        this._doctor = doc
        this._userSurname = surname
        this._userName = name
        this._userPatronymic = patronymic
        this._visit = purposeOfVisit
        this._comments = comments
    }
    static creatItemVisitInStart () {
        if (boardVisit.length) {
            notFound.classList.add('not-active')
            boardVisit.forEach((visit) => {

                const {_doctor: doc, _userSurname: surname, _userName: name, _userPatronymic: patronymic, _visit: purposeOfVisit, _age: age, _pressure: heart_pressure, _indexMass: index_mass, _disease: disease, _lastVisit: lastVisit,  _comments: comments = ''} = visit
                switch (doc) {
                    case "Терапевт":
                        visitTherapist = new Therapist(doc, surname, name, patronymic, purposeOfVisit, comments, age)
                        visitTherapist.creatNewCardVisit()
                        break
                    case "Кардиолог":
                        visitCardiologist = new Cardiologist(doc, surname, name, patronymic, purposeOfVisit, comments, heart_pressure, index_mass, disease)
                        visitCardiologist.creatNewCardVisit()
                        break
                    case "Стоматолог":
                        visitDentist = new Dentist(doc, surname, name, patronymic, purposeOfVisit, comments, lastVisit)
                        visitDentist.creatNewCardVisit()
                        break
                }
            })
        } else {
            notFound.classList.remove('not-active')
        }
    }
    creatNewCardVisit() {
        notFound.classList.add('not-active')
        let divVisit = document.createElement('div')
        divVisit.classList.add('request')
        divVisit.setAttribute('data-user', `${this._userSurname}${this._userName}`)
        divVisit.setAttribute('data-doc', this._doctor)
        divVisit.setAttribute('draggable', true)
        board.appendChild(divVisit)
        divVisit.innerHTML = ' <i class="request-closed fa fa-times" aria-hidden="true"></i>'
        let spanSurnameUser = document.createElement('p')
        divVisit.appendChild(spanSurnameUser)
        divVisit.setAttribute('data-user', `${this._userSurname}${this._userName}`)
        spanSurnameUser.innerHTML = `Фамилия : ${this._userSurname}`
        let spanNameUser = document.createElement('p')
        divVisit.appendChild(spanNameUser)
        spanNameUser.innerHTML = `Имя : ${this._userName}`
        let spanDoctor = document.createElement('p')
        divVisit.appendChild(spanDoctor)
        spanDoctor.innerHTML = `Доктор : ${this._doctor}`
        let spanMoreInfo = document.createElement('p')
        divVisit.appendChild(spanMoreInfo)
        spanMoreInfo.classList.add('show-info')
        spanMoreInfo.innerText = 'ПОКАЗАТЬ БОЛЬШЕ'

        divVisit.addEventListener('dragstart', (event) => {
            event.target.classList.add('drag-card')
        })
        divVisit.addEventListener('dragend', function(event) {
            this.classList.remove('drag-card')
        })
    }
}
class Therapist extends Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments, age ) {
        super(doc, surname, name, patronymic, purposeOfVisit, comments)
        this._age = age
    }
    showMoreInfo (target) {
        let parentDiv = target.parentElement

        let spanPurposeOfVisit = document.createElement('p')
        parentDiv.appendChild(spanPurposeOfVisit)
        spanPurposeOfVisit.classList.add('more-info')
        spanPurposeOfVisit.innerHTML = `Цель визита : ${visitTherapist._visit}`

        let spanAge = document.createElement('p')
        parentDiv.appendChild(spanAge)
        spanAge.classList.add('more-info')
        spanAge.innerHTML = `Возраст : ${visitTherapist._age}`

        let spanComments = document.createElement('p')
        parentDiv.appendChild(spanComments)
        spanComments.classList.add('more-info')
        spanComments.innerHTML = `Коментарии : ${visitTherapist._comments}`
    }
}
class Cardiologist extends Visit {
    constructor (doc, surname, name, patronymic, purposeOfVisit, comments, heart_pressure, index_mass, disease) {
        super(doc, surname, name, patronymic, purposeOfVisit, comments)
        this._pressure = heart_pressure
        this._indexMass = index_mass
        this._disease = disease
    }
    showMoreInfo (target) {
        let parentDiv = target.parentElement

        let spanPurposeOfVisit = document.createElement('p')
        parentDiv.appendChild(spanPurposeOfVisit)
        spanPurposeOfVisit.classList.add('more-info')
        spanPurposeOfVisit.innerHTML = `Цель визита : ${visitCardiologist._visit}`
        let spanAge = document.createElement('p')
        parentDiv.appendChild(spanAge)
        spanAge.classList.add('more-info')
        spanAge.innerHTML = `Возраст : ${visitCardiologist._age}`
        let spanPressure = document.createElement('p')
        parentDiv.appendChild(spanPressure)
        spanPressure.classList.add('more-info')
        spanPressure.innerHTML = `Обычное давление : ${visitCardiologist._pressure}`
        let spanIndexMass = document.createElement('p')
        parentDiv.appendChild(spanIndexMass)
        spanIndexMass.classList.add('more-info')
        spanIndexMass.innerHTML = `Индекс массы : ${visitCardiologist._indexMass}`
        let spanDisease = document.createElement('p')
        parentDiv.appendChild(spanDisease)
        spanDisease.classList.add('more-info')
        spanDisease.innerHTML = `Заболевания : ${visitCardiologist._disease}`
        let spanComments = document.createElement('p')
        parentDiv.appendChild(spanComments)
        spanComments.classList.add('more-info')
        spanComments.innerHTML = `Коментарии : ${visitCardiologist._comments}`

    }
}
class Dentist extends Visit {
    constructor(doc, surname, name, patronymic, purposeOfVisit, comments, lastVisit) {
        super(doc, surname, name, patronymic, purposeOfVisit, comments)
        this._lastVisit = lastVisit
    }
    showMoreInfo (target){
        let parentDiv = target.parentElement
        let spanPurposeOfVisit = document.createElement('p')
        parentDiv.appendChild(spanPurposeOfVisit)
        spanPurposeOfVisit.classList.add('more-info')
        spanPurposeOfVisit.innerHTML = `Цель визита : ${visitDentist._visit}`
        let spanLastVisit = document.createElement('p')
        parentDiv.appendChild(spanLastVisit)
        spanLastVisit.classList.add('more-info')
        spanLastVisit.innerHTML = `Последний визит : ${visitDentist._lastVisit}`
        let spanComments = document.createElement('p')
        parentDiv.appendChild(spanComments)
        spanComments.classList.add('more-info')
        spanComments.innerHTML = `Коментарии : ${visitDentist._comments}`
    }
}
////////Drag & Drop///////////
board.addEventListener('dragover', (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
})
board.addEventListener('drop', (event) => {
    let dropCard = board.querySelector('.drag-card')
    let coordinateX = event.pageX - (dropCard.offsetWidth / 2 + 16)
    let coordinateY = event.pageY - (dropCard.offsetHeight / 2)
    dropCard.style.position = 'absolute'
    dropCard.style.top = `${coordinateY}px`
    dropCard.style.left = `${coordinateX}px`
})
/////////////////////////////
Visit.creatItemVisitInStart()
//Активировать форму выбора врача
btnNewReq.addEventListener('click', () => {
    if (request_doctor.getAttribute('class') === "apply_to_doctor" ) {
        wrapRequestDoctor.classList.add('active')
        btnCreatVisit.classList.remove('active')
        active_doctor = undefined
    }
})
//Закрыть форму выбора врача по клику рядом с обнулением инпутов
wrapRequestDoctor.addEventListener('click', (event) => {
    if (event.currentTarget === event.target)
        resetForm()
})
//Закрыть форму выбора врача крестиком с обнулением инпутов
btnClosed.addEventListener('click', function () {
    resetForm()
})
//Выбрать определенного врача
selectDoctor.addEventListener('click',function () {
    if (this.value) {
        forms.forEach((form)=>{
            if (form.getAttribute('data-doc') === this.value) {
                form.classList.add('active')
                btnCreatVisit.classList.add('active')
                active_doctor = this.value
                inputForm.forEach((input) => {
                    input.value = ''
                })
            } else {
                form.classList.remove('active')
            }
        })
    }
})
//Отправка данных с проверкой на заполненые строки
btnCreatVisit.addEventListener('click', () => {
    if (active_doctor === 'therapist') {
        doc = "Терапевт"
        surname = document.querySelector('.surname-therapist').value
        name = document.querySelector('.name-therapist').value
        patronymic = document.querySelector('.patronymic-therapist').value
        age = document.querySelector('.age-therapist').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-therapist').value
        comments = document.querySelector('.comments-therapist').value

        if (surname && name && patronymic && age && purposeOfVisit !== false) {
            visitTherapist = new Therapist(doc, surname, name, patronymic, purposeOfVisit, comments, age)
            boardVisit.push(visitTherapist)
            writeVisitInLocalSt()
            visitTherapist.creatNewCardVisit()
            resetForm()
        } else {
            alert ('Заполните все поля')
        }
    } else if (active_doctor === 'cardiologist') {
        doc = "Кардиолог"
        surname = document.querySelector('.surname-cardiologist').value
        name = document.querySelector('.name-cardiologist').value
        patronymic = document.querySelector('.patronymic-cardiologist').value
        age = document.querySelector('.age-cardiologist').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-cardiologist').value
        heartPressure = document.querySelector('.heart_pressure').value
        indexMass = document.querySelector('.index_mass').value
        disease = document.querySelector('.disease').value
        comments = document.querySelector('.comments-cardiologist').value

        if (surname && name && patronymic && age && purposeOfVisit && heartPressure && indexMass && disease !== false) {
            visitCardiologist = new Cardiologist(doc, surname, name, patronymic, purposeOfVisit, comments, heartPressure, indexMass, disease)
            boardVisit.push(visitCardiologist)
            writeVisitInLocalSt()
            visitCardiologist.creatNewCardVisit()
            resetForm()
        } else {
            alert ('Заполните все поля')
        }
    } else if (active_doctor === 'dentist') {
        doc = "Стоматолог"
        surname = document.querySelector('.surname-dentist').value
        name = document.querySelector('.name-dentist').value
        patronymic = document.querySelector('.patronymic-dentist').value
        lastVisit = document.querySelector('.last_visit').value
        purposeOfVisit = document.querySelector('.purpose_of_visit-dentist').value
        comments = document.querySelector('.comments-dentist').value

        if (surname && name && patronymic && lastVisit && purposeOfVisit !== false) {
            visitDentist = new Dentist (doc, surname, name, patronymic, purposeOfVisit, comments, lastVisit)
            boardVisit.push(visitDentist)
            writeVisitInLocalSt()
            visitDentist.creatNewCardVisit()
            resetForm()
        } else {
            alert ('Заполните все поля')
        }
    }
    return boardVisit
})
// Удаляем крестиком карточку визита
board.addEventListener('click', ({target}) => {
    if ( target.tagName === 'I' ) {
        boardVisit = boardVisit.filter((visit) => {
            return visit._idUser !== (target.parentElement.getAttribute('data-user'))
        })
        target.parentElement.remove()
        writeVisitInLocalSt()
        if (boardVisit.length === 0) {
            notFound.classList.remove('not-active')
        }
    }
})
// Скрыть & Показать инфо
board.addEventListener('click', ({target}) => {
    if  ( target.className === 'show-info') {
        console.log(target.parentElement.getAttribute('data-doc'));
        // target.parentElement.style.height = "100%"
        switch (target.parentElement.getAttribute('data-doc')) {
            case 'Терапевт':
                visitTherapist.showMoreInfo(target)
                break
            case 'Кардиолог':
                visitCardiologist.showMoreInfo(target)
                break
            case 'Стоматолог':
                visitDentist.showMoreInfo(target)
                break
        }
        console.log(target);
        target.parentElement.appendChild(target)
        target.innerText = 'СКРЫТЬ'
        target.classList.remove('show-info')
        target.classList.add('hide-info')
    } else if( target.className === 'hide-info' ) {
        target.parentElement.querySelectorAll('.more-info').forEach((child) => {
            child.remove()
        })
        target.innerText = 'ПОКАЗАТЬ БОЛЬЩЕ'
        target.classList.add('show-info')
        target.classList.remove('hide-info')
    }
})
// Load from Local Storage
function loadDataLocalSt () {
    if (localStorage.Board_Visit) {
        boardVisit = JSON.parse(localStorage.getItem('Board_Visit'))
    }
}
//Write new visit in Local Storage
function writeVisitInLocalSt() {
    seriaBoard = JSON.stringify(boardVisit)
    localStorage.setItem("Board_Visit", seriaBoard)
}
//Function reset form
function resetForm () {
    wrapRequestDoctor.classList.remove('active')
    inputForm.forEach((input) => {
        input.value = ''
    })
    forms.forEach((form) => {
        form.classList.remove('active')
    })
    selectDoctor.value = 'select'
}
