/* 
구현 샘플 스크립트 입니다.
오류가 있을 수 있습니다.
*/

let wrap = document.querySelector(".wrap");
let headerWrap = document.querySelector(".header_wrap");
let containerWrap = document.querySelector(".container_wrap");
let section = document.querySelector("section.container");
let footerWrap = document.querySelector(".footer_wrap");

let windowPos = 0;
let containerPos = 0;

window.addEventListener('scroll', function(){
    windowPos = window.pageYOffset || window.scrollY;
    // console.log("windowPos : ", windowPos);
});

containerWrap.addEventListener('scroll', function(){
    containerPos = containerWrap.pageYOffset || containerWrap.scrollY;
    // console.log("containerWrap : ", containerWrap);
})





function fixedWrapSize(bloon){
    if(bloon) {
        // document.querySelector("html").removeAttribute("style");
        // document.querySelector("body").removeAttribute("style");
        // wrap.removeAttribute("style");
        // containerWrap.removeAttribute("style");

        document.querySelector("html").style.height = "";
        document.querySelector("body").style.height = "";
        wrap.style.height = "";
        containerWrap.style.height = "";
    } else if(!bloon) {
        document.querySelector("html").style.height = 100 + "%";
        document.querySelector("body").style.height = 100 + "%";
        wrap.style.height = 100 + "%";
        containerWrap.style.height = 100 + "%";
    } else {
        console.log("???")
    }
}


/* 전체 컨텐츠의 높이값이 화면보다 작은 경우 중간컨텐츠(container_wrap)의 최소 높이값 지정(높이값을 키운다) */
function fixedContainerSize(){
    wrap = document.querySelector(".wrap");
    headerWrap = document.querySelector(".header_wrap");
    containerWrap = document.querySelector(".container_wrap");
    section = document.querySelector("section.container");

    fixedWrapSize(true);
    if(section.clientHeight > containerWrap.clientHeight) {
        fixedWrapSize(true);
    } else if(wrap && wrap.clientHeight <= window.innerHeight){
        fixedWrapSize(false);
        containerWrap.style.height = window.innerHeight - headerWrap.clientHeight + "px";
        section.style.height = "100%";
	} else {
        containerWrap.style.backgroundColor = "";
    }
}
// fixedContainerSize();








function observerFn(ele){
    // 1. 대상 선정
    // 대상 node 선택
    const target = document.querySelector('.wrap');

    // 2. 옵저버 인스턴스 생성
    // 감시자 인스턴스 만들기
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // console.log(mutation.type);
            if(mutation.type == 'attributes') {
                // console.log("속성이 바뀌었다.")
            } else if (mutation.type == 'childList'){
                // console.log("항목이 삭제되거나 추가되었다.");
                fixedContainerSize();
            }
        });
    });

    // 3. 옵션 설정
    // 감시자의 설정:
    const config = {attributes:false, childList:true, characterData:false, subtree:true};
    // 4. 실행
    // 감시자 옵션 포함, 대상 노드에 전달
    observer.observe(target, config);
}
observerFn();





// let pos;

// window.addEventListener('scroll', function(){
// 	pos = window.scrollY;
// });


// 툴팁 도움말
function layer_tooltip(ele) {
	$(".layer.help").hide();
	$(".layer.help").removeClass("active");
	let thisOffset  = ele.offset().top;
    let thisOffsetLeft  = ele.offset().left;
	let $targetHref = ele.attr("href");
	let targetId = $targetHref;

    $(targetId).css({
        top : thisOffset,
        marginTop : ele.outerHeight() + 10
    });

	$(targetId).show();
	$(targetId).addClass("active");

    let layerArrow = $(".layer.help span.arrow");
    $(layerArrow).css({
        left : thisOffsetLeft + (ele.outerHeight() / 2),
        zIndex : 2
    })
	return false;
}
$("a.help").on("click", function(e){
	layer_tooltip($(this));
	return false;
})
// 툴팁 도움말 end


$(".layer .btn_close, .layer .next").on("click", function(){
    $(this).parents(".layer").hide();
});


/*
function layer_tooltip222(ele) {
    let helpLayer = document.querySelectorAll(".layer.help");
    helpLayer.forEach(function(item){
		item.style.display = "none";
        item.classList.remove("active");
	})

    let thisOffsetTop  = ele.offsetTop;
    let thisOffsetLeft  = ele.offsetLeft;
	let $targetHref = ele.getAttribute("href");
	let targetId = document.querySelector($targetHref);

    targetId.style.display = "block";
    targetId.classList.add("active");
    targetId.style.top = thisOffsetTop + 'px';
    targetId.style.marginTop = ele.offsetHeight + 17 + 'px';
    

    let layerArrow = document.querySelector(".layer.help span.arrow");
    layerArrow.style.left = thisOffsetLeft + (ele.offsetHeight / 2) + 'px';
    layerArrow.style.zIndex = 2;
    return false;
}

const btnHelp  = document.querySelector("a.help");
if(btnHelp != null) {
    btnHelp.addEventListener("click", function(event){
        event.preventDefault();
        layer_tooltip222(this);
        return false;
    })
}
*/


// const btnGroup = document.querySelector(".btn_Group");
// if(btnGroup) {
//     h = btnGroup.offsetHeight;
//     console.log(h)
//     const cpWrap = document.querySelector(".cp_wrap");
//     cpWrap.style.paddingBottom = h + 'px';
// }



/* 쿠폰 변경 하기 */
const couponList = document.querySelectorAll(".couponPack_change_item");
couponList.forEach(function(item){
    item.addEventListener("click", function(event){
        event.preventDefault();
        for(i=0; i < couponList.length; i++) {
            couponList[i].classList.remove("active");
        }
        this.classList.add("active");
        return false;
    })
})



/* 공지사항, 자주하는 질문 내용(회색영역) 최소 높이값 */
const viewCon = document.querySelector(".view_con");
if(viewCon) {
	const bodyHeight = document.querySelector("body").offsetHeight;
	const cpHeaderHeight =  document.querySelector(".cp_header").offsetHeight;
	const viewTitHeight = document.querySelector(".view_tit").offsetHeight;	
	if(cpHeaderHeight) {
		viewCon.style.minHeight = (bodyHeight - cpHeaderHeight - viewTitHeight) + 'px';
	} else {
		viewCon.style.minHeight = (bodyHeight - viewTitHeight) + 'px';
	}
}

window.addEventListener("load", function(){
    fixedContainerSize();
})





/* progress bar */
let circleProgressWrap = document.querySelector(".circle_progress_wrap");
if(circleProgressWrap) {
	let bar = document.querySelector('.bar');
	let RADIUS = 59;
	let CIRCUMFERENCE = 2 * Math.PI * RADIUS;
	function progress(per) {
		let progress = per / 100;
		let dashoffset = CIRCUMFERENCE * (1 - progress);
		bar.style.strokeDashoffset = dashoffset;
		bar.style.opacity = 1;
	}

	bar.style.strokeDasharray = CIRCUMFERENCE;
	progress(30); /* 0 ~ 100) */
}
/* // progress bar */





/* home, 주간 리포트 관련 circle graph (구현 샘플입니다. 수정 적용 부탁드립니다.) */
function mainGraphBar(num){
    let value = num;
    let graph_wrap = document.querySelector(".graph_wrap");
    let graph = graph_wrap.querySelector(".graph");
    let circumference = Math.PI * (graph.offsetWidth + 8);
    let circumferencePer = circumference / 100;

    if(graph) {
        let circle = graph.querySelector("circle.bar");
        if(value == null || value == undefined || value == 0 ) {
            return false;
        }
        if(value <= 70) {
            // value = 18;
            circle.style.stroke = "url(#GradientColor1)";
            graph_wrap.querySelector(".current strong").classList.add("c_danger");
        } else if(value <= 80) {
            // value = 62;
            circle.style.stroke = "url(#GradientColor2)";
            graph_wrap.querySelector(".current strong").classList.add("c_caution");
        } else if(value <= 90){
            // value = 91;
            circle.style.stroke = "url(#GradientColor3)";
            graph_wrap.querySelector(".current strong").classList.add("c_safe");
        } else if(value <= 100){
            // value = 100;
            circle.style.stroke = "url(#GradientColor3)";
            graph_wrap.querySelector(".current strong").classList.add("c_safe");
        } else {
            alert("엥?")
        }
        graph_wrap.querySelector(".current strong").innerHTML = value;
        
        let graphBar = (100 - value) * circumferencePer;
    
        const keyFrames = document.createElement("style");
        keyFrames.setAttribute("id", "test")
        keyFrames.innerHTML = `
        @keyframes aniBar {
            0% {
                stroke-dashoffset:${circumference}
            }
            100% {
                stroke-dashoffset:${graphBar};
            }
        }
        `;
        // circle.style.strokeDashoffset = graphBar;
        let body = document.querySelector("body")
        body.appendChild(keyFrames);
        console.log(graphBar, value)
    }
}
//mainGraphBar();




// User-Agent 문자열 가져오기
const userAgent = navigator.userAgent;
const isIOS = /iPhone|iPad|iPod/.test(userAgent);
const isAndroid = /Android/.test(userAgent);

if (isIOS) {
  let bgAlerts = document.querySelectorAll(".bg_alert");
  bgAlerts.forEach(function(item){
    item.classList.add("iOS")
  })
} else if (isAndroid) {
  let bgAlerts = document.querySelectorAll(".bg_alert");
  bgAlerts.forEach(function(item){
    item.classList.add("AOS")
  })
} else {
  // iOS와 Android가 아닐 때 처리 (예: PC 브라우저)
}




/* 별도앱 관련 테스트 */
// 조건.
// 메인 메뉴가 없거나 페이지 타이틀이 content_wrap 안에 있는 경우에만 실행됨.
// 페이지 타이틀은 titleBig, 또는 subResurtTit 두가지 class로 되어있음.
let tagNav = document.querySelector("nav");
let pageTit = containerWrap.querySelectorAll(".subResurtTit");
if(!headerWrap.querySelector(".titleBig") && !tagNav && pageTit.length) {
    pageTit.forEach(function(item){
        let elem = item;
        while(elem != null) {
            elem = elem.parentElement;
            if(elem.parentElement.closest(".container_wrap")) { // 이게 아닐때 까지 계속 돔.
                console.log(elem);
                if(elem.classList.contains("content_top")){
                    console.log("top에 있음.");
                    let temps = document.querySelectorAll(".content_top > div");
                    if(temps.length == 1) {
                        elem.classList.add("topFixed");
                    }
                    console.log(temps);
                    console.log(temps.length);
                    return false;
                } else if(elem.classList.contains("content_mid")) {
                    console.log("mid에 있음.")
                    return false;
                }
            } else {
                return false;
            }
        }
    })
    pageTit[0].classList.add("fnPageTit");
}