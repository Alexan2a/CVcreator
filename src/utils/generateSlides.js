export function generateSlides() {
  var Chance = require("chance");
  var chance = new Chance();
  const img = [
    "./img/img1.jpg",
    "./img/img3.jpg",
    "./img/img4.jpg",
    "./img/img2.jpg",
  ];
  const discr = [
    "Online helper in building your career",
    "Totally free to use",
    "Register to save your CVs",
    "SMTH WRITTEN",
  ];
  let slides = [];
  for (let i = 0; i < 4; i++) {
    let item = {
      id: chance.guid(),
      text: discr[i],
      imgURL: img[i],
    };
    slides.push(item);
  }
  return slides;
}
