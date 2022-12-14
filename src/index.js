const url = './data.json';

async function getGraphicData() {
  const response = await fetch(url);
  const data = await response.json();
  setGraphicData(data)
};

getGraphicData();

function setGraphicData(data) {
  const graphicUL = document.querySelector('.graphic-ul');
  data.forEach((dataItem) => {
    const graphicLI = createDataGraphic(dataItem);
      graphicUL.innerHTML += graphicLI;
  });

  const graphicColumn = document.querySelectorAll('.graphic-column');
  animationGraphic(graphicColumn)

  const graphicList = document.querySelectorAll('.graphic-ul li');
  graphicList.forEach((graphicItem) => {
    graphicItem.addEventListener('mouseenter', showValueGraphic);
    graphicItem.addEventListener('mouseleave', hideValueGraphic);
  });
};

function createDataGraphic({day, amount, porcentage}) {
  const currentDate = new Date();
  const currentDay = currentDate.toString().substring(0, 3).toLocaleLowerCase();
  if(porcentage > 200) porcentage = 200;
  if(porcentage < 0) porcentage = 0; 

  const dayElement = `
  <li>
    <div class="graphic-amount">$ ${amount}</div>
    <div data-porcentage="${porcentage}" 
    class="graphic-column ${currentDay === day ? 'current' : ''}"></div>
    <span class="graphic-day">${day}</span>
  </li>
  `;
  return dayElement;
};

function showValueGraphic(e) {
  e.target.classList.add('active');
};

function hideValueGraphic(e) {
  e.target.classList.remove('active');
};

function animationGraphic(graphicList) {
  graphicList.forEach((graphicItem) => {
    const porcentage = graphicItem.dataset.porcentage;
    let cont = 0;
    let time = setInterval(() => {
      cont += 1;
      if(cont >= porcentage) clearInterval(time);
      graphicItem.style.height = `${cont}px`;
    }, 15);
  });
};