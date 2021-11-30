window.alertModal = function(msg) {
    alert(msg)
}

// 소수점 지정 자리수 이하 버림
function cutDot(v, cut) {
    let num = parseFloat(v.toString().replace(/,/gi, ''))

    if (cut > 0) {
        return Math.abs(num.toFixed(cut))
    }

    return num
}
Number.prototype.cutDot = function(cut = 0) {
    return cutDot(this, cut)
}

String.prototype.cutDot = function(cut = 0) {
    return cutDot(this, cut)
}

function numberFormat(v) {
    if (v != '-' && !isNaN(v)) {
        v = v.toString()

        if (v !== '') {
            let minus = parseInt(v) >= 0 ? false : true
            let find = /(\d+)(\d{3})/
            let spNum = v.split('.')
            let num = parseInt(spNum[0].replace(/[^0-9]/g, '')).toString()

            while (find.test(num)) {
                num = num.replace(find, '$1' + ',' + '$2')
            }

            if (minus) {
                num = '-' + num
            }

            return num
        }
    }

    return 0
}

Number.prototype.numberFormat = function() {
    return numberFormat(this)
}

String.prototype.numberFormat = function() {
    return numberFormat(this)
}

String.prototype.getSize = function(flag = '') {
    let size = ''

    if (flag == '') {
        if (isNaN(this)) {
            size = this + '; ';
        } else {
            size = this + 'px; ';
        }
    } else if (flag == 'x') {
        if (isNaN(this)) {
            size = `0 ${this}; `;
        } else {
            size = `0 ${this}px; `;
        }
    } else if (flag == 'y') {
        if (isNaN(this)) {
            size = `${this} 0; `;
        } else {
            size = `${this}px 0; `;
        }
    }

    return size
}

String.prototype.cInt = function() {
    let int = 0

    if (this != '') {
        int = parseFloat(this.replace(/,/gi, ''))
    }

    return int
}

String.prototype.patternCheck = function(flag) {
    var pattern = ''

    switch (flag) {
        //영문만 유효성 검사
        case 'eng':
            pattern = /^[a-z|A-Z]+$/
            break
        //영문,숫자 유효성 검사
        case 'engnum':
            pattern = /^[(a-z|A-Z)0-9]+$/
            break
        //아이디 영문,숫자,underbar(_) 사용 유효성 검사
        case 'id':
            pattern = /^[(a-z|A-Z)0-9]+[_]*[(a-z|A-Z)0-9]+$/
            break
        //정수 유효성 검사
        case 'num':
            pattern = /^[0-9]+$/
            break
        //영문,숫자 혼합사용 유효성 검사
        case 'wordnum':
            pattern = /^([0-9]+[a-z|A-Z]+)|([a-z|A-Z]+[0-9]+)$/
            break
        //이메일 유효성 검사
        case 'email':
            pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            break
    }

    return pattern.test(this.toString())
}

String.prototype.nl2br = function() {
    if (this.trim() !== '') {
        return this.trim().replace(/\n/g, "<br>")
    } else {
        return ""
    }
}

String.prototype.isEmpty = function(str) {
    if (this.length === 0 || this === null || this === undefined) {
        if (str != '' && str !== undefined) {
            return str
        } else {
            return ''
        }
    } else {
        return this
    }
}

//=========================================================================
//  함수 명 : phoneNumber
//  함수 설명 : 핸드폰 번호 대쉬 삽입 처리
//=========================================================================
String.prototype.phoneNumber = function() {
    let str = ''
    const len = this.length

    if (len == 9) {
        str = this.substr(0, 2) + '-' + this.substr(2, 3) + '-' + this.substr(5, 4)
    } else if (len == 10) {
        str = this.substr(0, 3) + '-' + this.substr(3, 3) + '-' + this.substr(6, 4)
    } else if (len == 11) {
        str = this.substr(0, 3) + '-' + this.substr(3, 4) + '-' + this.substr(7, 4)
    }

    return str
}

//=========================================================================
//  함수 명 : companySerial
//  함수 설명 : 사업자등록번호 포멧
//=========================================================================
String.prototype.companySerial = function() {
    if (this == '') {
        return ''
    } else {
        return this.substr(0, 3) + '-' + this.substr(3, 2) + '-' + this.substr(5, 5)
    }
}

//=========================================================================
//  함수 명 : companySerial
//  함수 설명 : 국세청 승인번호 포멧(세금계산서)
//=========================================================================
String.prototype.ntsKey = function() {
    return this.substr(0, 8) + '-' + this.substr(8, 8) + '-' + this.substr(16, 24)
}

String.prototype.fileSize = function() {
    return fileSize(this)
}

Number.prototype.fileSize = function() {
    return fileSize(this)
}

function fileSize(num) {
    const x = parseInt(num)
    const s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const e = Math.floor(Math.log(x) / Math.log(1024));

    return Math.abs((x / Math.pow(1024, e)).toFixed(2)).toString() + s[e];
}

Date.prototype.getDateFormat = function(format, days = 0) {
    let date = this

    if (days !== 0) {
        const time = date.getTime()
        date = new Date(time + (86400 * days * 1000))
    }

    var year = date.getYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var dYear = date.getFullYear()
    var dMonth = month
    var dDay = day

    if (month.toString().length == 1) dMonth = "0" + month
    if (day.toString().length == 1) dDay = "0" + day

    format = format.replace("Y", dYear)
    format = format.replace("m", dMonth)
    format = format.replace("d", dDay)
    format = format.replace("y", year)
    format = format.replace("n", month)
    format = format.replace("j", day)

    var hours = this.getHours()
    var min = this.getMinutes()
    var sec = this.getSeconds()
    var dHours = hours
    var dMin = min
    var dSec = sec

    if (hours.toString().length == 1) dHours = "0" + hours
    if (min.toString().length == 1) dMin = "0" + min
    if (sec.toString().length == 1) dSec = "0" + sec

    format = format.replace("H", dHours)
    format = format.replace("i", dMin)
    format = format.replace("s", dSec)

    return format
}

// 해당 날짜를 비교 하여 date값 과의 날짜 차이를 반환 한다.
// 해당 date 인자는 date object로 받아야 한다
Date.prototype.dateDiff = function(date) {
    const now = new Date(this.getFullYear(), this.getMonth(), this.getDate())
    const selfTime = now.getTime()
    const getTime = date.getTime()

    return parseInt((getTime - selfTime) / 86400 / 1000)
}

Array.prototype.distinct = function(any) {
    return this.filter(item => {
        console.log(typeof item)
    })
}

export default {
    install(app, options) {
        // console.log(options)

        const util = {}

        util.alert = (msg) => {
            alert(msg)
        }

        util.copy = (any) => {
            return JSON.parse(JSON.stringify(any))
        }

        util.delay = async (time) => {
            return await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, time)
            })
        }

        app.config.globalProperties.$util = util
        app.provide('util', util)
    }
}