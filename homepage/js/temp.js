'use strict';


/*
phonesafe
이하 전체 테스트 스크립트입니다.
개발에 맞게 새로 작성해서 적용 부탁드립니다.
*/


window.addEventListener("load", function(){
	let width = window.innerWidth;
	resize(width);
	let scrollY = window.scrollY;
	fn_scrollY(scrollY);
})

window.addEventListener("resize", function(){
	let width = window.innerWidth;
	resize(width);
})

window.addEventListener("scroll", function(){
	let scrollY = window.scrollY;
	fn_scrollY(scrollY);
})

function resize(resizeWidth){
	if(resizeWidth >= 786) {
		document.querySelector("header").classList.remove("mobile");
	} else {
		document.querySelector("header").classList.add("mobile");
	}
}


function fn_scrollY(ddd){
	if(ddd > 0) {
		document.querySelector("header").classList.add("active");
	} else {
		document.querySelector("header").classList.remove("active");
	}

	let header = document.querySelector("header.home");
	if(header) {
		let sections = document.querySelectorAll(".section");

		gnbAs.forEach(function(item){
			item.classList.remove("active")
		})
		if(ddd <= sections[2].offsetTop - header.offsetHeight) {
			gnbAs[0].classList.add("active");
			console.log("000");
		} else if(ddd <= sections[3].offsetTop - header.offsetHeight) {
			gnbAs[1].classList.add("active");
			console.log("111");
		} else if(ddd <= sections[4].offsetTop - header.offsetHeight) {
			gnbAs[2].classList.add("active");
			console.log("222");
		}
	}
}





/* 토글 메뉴 */
let toggleBtn = document.querySelector(".btn_menu_toggle button");
toggleBtn.addEventListener("click", function(){
	if(document.querySelector("#aside-nav").classList.contains("active")){
		document.querySelector("#aside-nav").classList.remove("active");
		// document.querySelector("#aside-nav").style.display = "none";
	} else {
		document.querySelector("#aside-nav").classList.add("active");
		// document.querySelector("#aside-nav").style.display = "block";
	}
})
/* // 토글 메뉴 */




/* aside */
let btn_close_aside = document.querySelector(".aside div.btn-close");
btn_close_aside.addEventListener("click", function(){
	document.querySelector("#aside-nav").classList.remove("active");
	// document.querySelector("#aside-nav").style.display = "none";
})
/* // aside */




/* 레이어팝업 닫기 */
let layers = document.querySelectorAll(".layer");
if(layers.length > 0) {
	layers.forEach(function(item){
		let btn_close = item.querySelector(".btn_close");
		btn_close.addEventListener("click", function(e){
			e.target.closest(".layer").style.display = "none";
		})
	})
}




/* 해지하기 입력창 */
let cancelInputs = document.querySelectorAll(".phonenumber_wrap input")
cancelInputs.forEach(function(item, index){
	item.addEventListener("focusin", function(e){
		e.target.closest(".item").classList.add("focus");
	})
	item.addEventListener("blur", function(e){
		e.target.closest(".item").classList.remove("focus");
	})
})
/* // 해지하기 입력창 */




let gnbAs = document.querySelectorAll(".gnb li a");

window.addEventListener("load", function(){
	// 현재 페이지의 URL 가져오기
	const url = window.location.href;

	// "section" 단어의 위치 찾기
	const sectionIndex = url.indexOf("section");
	if (sectionIndex !== -1) {
		// "section" 다음에 오는 문자열 추출
		const sectionNumber = url.slice(sectionIndex + 7);
		// 숫자만 추출
		const number = parseInt(sectionNumber);
		if (!isNaN(number)) {
			console.log("찾은 숫자:", number);
			for(let i = 0; i < gnbAs.length; i++){
				gnbAs[i].classList.remove("active");
				if(number==0) {
					gnbAs[number].classList.add("active");	
				} else {
					gnbAs[number-1].classList.add("active");
				}
			}
		} else {
			console.log("숫자를 찾지 못했습니다.");
		}
	} else {
		console.log("'section'을 찾지 못했습니다.");
	}
})

gnbAs.forEach(function(item,index){
	item.addEventListener("click", function(e){
		console.log(index)
		for(let i = 0; i < gnbAs.length; i++){
			gnbAs[i].classList.remove("active");
			gnbAs[index].classList.add("active");
		}
	})
})






