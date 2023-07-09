const css = document.getElementById("tab_css");
const html = document.getElementById("tab_html");
const js = document.getElementById("tab_js");

const tabList = [css, html, js];

const display_list = document.getElementById("display_list") as HTMLElement;
const slide_preview = document.getElementById("slide_preview") as HTMLElement;

const textarea = document.getElementById("text_editor") as HTMLTextAreaElement;
const lineNumbers = document.getElementById("line_numbers") as HTMLElement;

textarea?.addEventListener("keyup", () => {
  adjustTextAreaSize();

  const numberOfLines = textarea.value?.split("\n").length;
  lineNumbers.innerHTML = Array(numberOfLines).fill("<span></span>").join("");
});

textarea?.addEventListener("keydown", () => {
  adjustTextAreaSize();

  const numberOfLines = textarea.value?.split("\n").length;
  lineNumbers.innerHTML = Array(numberOfLines).fill("<span></span>").join("");
});

function adjustTextAreaSize() {
  const numberOfLines = textarea.value?.split("\n").length;

  console.log(numberOfLines);
  textarea.style.height = (numberOfLines * 20 + 20).toString() + "px";
}

slide_preview?.addEventListener("mousedown", function () {
  (window.frames[0] as any).jumpNext();
});

document.addEventListener("keydown", function () {
  (window.frames[0] as any).jumpNext();
});

var slide_html: String;
var slide_js: String;

type Slide = {
  css: String;
};

var slides_css: Slide[] = [];

function switchView(view: number) {
  css?.classList.remove("active");
  html?.classList.remove("active");
  js?.classList.remove("active");

  tabList[view]?.classList.add("active");
}

var activeSlide: number = 0;

function selectSlide(slideIndex: number) {
  const slides = document.getElementsByClassName("slide_card");

  slides[activeSlide]?.classList.remove("active");
  slides[slideIndex]?.classList.add("active");

  activeSlide = slideIndex;
}

function addSlide() {
  display_list.innerHTML += `
<div class="slide_card" onclick="selectSlide(${slides_css.length})" id="slide-${slides_css.length}">
    <div class="left">${slides_css.length}</div>
    <div class="right">
        <img src="not_found.jpg">
    </div>
</div>
    `;

  const slide: Slide = {
    css: "",
  };

  slides_css.push(slide);

  selectSlide(slides_css?.length - 1);
}

function deleteSlide() {
  display_list.innerHTML = "";

  slides_css.splice(activeSlide, 1);

  rerenderSlides();
}

function rerenderSlides() {
  slides_css.forEach((slide, index) => {
    slide = slide;

    display_list.innerHTML += `
<div class="slide_card" onclick="selectSlide(${index})" id="slide-${index}">
    <div class="left">${index}</div>
    <div class="right">
        <img src="not_found.jpg">
    </div>
</div>
      `;
  });
}

function getSlides() {
  return slides_css;
}
