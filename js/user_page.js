import {formatSize} from './utils.js'

export function show_user_info(data) {
    const userInfoContainer = document.createElement('div')
    userInfoContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`
    
    const userData = data.data.user[0] // user response
    console.log("userData :", userData)

    const all_transact_info_user = data.data.transaction
    
    // Just for calcul after
    const filteredTransactions = data.data.transaction.filter((t) => {
      return t.type === 'xp' && t.path.includes('/rouen/div-01');
    });
    filteredTransactions.sort((a, b) => {
      return a.id - b.id;
    });

    // Merci TheOldestBrother <3
  const currentDate = new Date();
  let minimumDate = new Date();
  let startXP = 0;
  minimumDate.setMonth(minimumDate.getMonth() - 6);
  let totalXP = 0;
  const validTx = filteredTransactions.filter((tx) => {
    const date = new Date(tx.createdAt);
    totalXP += tx.amount;
    if (date < minimumDate) startXP += tx.amount;
    return date >= minimumDate;
  });
  console.log("minimum data: ", minimumDate)
  const stepHor = (currentDate - minimumDate) / 100;
  const stepVert = (totalXP - startXP) / 100;
  let currentXP = startXP;
  const points = validTx.reduce((accumulator, tx) => {
    const currentDate = new Date(tx.createdAt);
    let displacementX = (currentDate - minimumDate) / stepHor;
    let displacementY = (currentXP - startXP + tx.amount) / stepVert;
    let x = Math.floor((450 / 100) * displacementX);
    let y = Math.floor(210 - (210 / 100) * displacementY);
    currentXP += tx.amount;
    return `${accumulator}${x},${y} `;
  }, "");
  console.log("🚀 ~ points ~ points:", points);
  // Merci TheOldestBrother <3

  //console.log(totalXP)
  totalXP = formatSize(totalXP)
  //console.log(totalXP)

  const section = document.createElement('section')
  section.id = 'profile-section'
  section.classList.add('vh-100')
  //section.style.backgroundColor = '#508bfc'

  const container = document.createElement('div')
  container.classList.add('container', 'py-5', 'h-100')

  const row = document.createElement('div')
  row.classList.add(
    'row',
    'justify-content-center',
    'align-items-center',
    'h-100'
  )
  //row.setAttribute('border', )

  const col = document.createElement('div')
  col.classList.add('col-md-8')

  const card = document.createElement('div')
  card.classList.add('card')
  card.setAttribute('style', 'border-width: 5px')

  const cardHeader = document.createElement('div')
  cardHeader.classList.add('card-header')
  cardHeader.innerHTML = '<h3 style="padding-top: 0.5rem;">User Profile</h3>'
  cardHeader.setAttribute('style', 'text-align: center;')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const nomLabel = document.createElement('label')
  nomLabel.textContent = 'Last Name:'
  nomLabel.style.paddingRight = '5px'
  const nomSpan = document.createElement('span')
  nomSpan.id = 'last_name'
  nomSpan.textContent = userData.lastName

  const prenomLabel = document.createElement('label')
  prenomLabel.textContent = 'First Name:'
  prenomLabel.style.paddingRight = '5px'
  const prenomSpan = document.createElement('span')
  prenomSpan.id = 'first_name'
  prenomSpan.textContent = userData.firstName

  const pseudoLabel = document.createElement('label')
  pseudoLabel.textContent = 'Username:'
  pseudoLabel.style.paddingRight = '5px'
  const pseudoSpan = document.createElement('span')
  pseudoSpan.id = 'username'
  pseudoSpan.textContent = userData.login

  const divName = document.createElement('div')
  divName.classList.add('name-section')
  divName.setAttribute('style', 'margin-bottom: 1rem')
  divName.appendChild(nomLabel);
  divName.appendChild(nomSpan);
  divName.appendChild(document.createElement("br"));
  divName.appendChild(prenomLabel);
  divName.appendChild(prenomSpan);
  divName.appendChild(document.createElement("br"));
  divName.appendChild(pseudoLabel);
  divName.appendChild(pseudoSpan);

  // Just test for the spider graph
  //console.log("All transactions infos:", all_transact_info_user)
  let array_skill_prog = transactSkill(all_transact_info_user)
  console.log("Skill prog table: ", array_skill_prog)

  const profileSection = document.createElement('div')
  profileSection.classList.add('profile-section')
  profileSection.setAttribute('style', 'margin-bottom: 1rem') // for a balise p 1rem is in
  profileSection.innerHTML = `
    <h4>Additional informations</h4>
    <span id="level">Level: ${userData.events[0].level}</span>
    <br>
    <span id="total_xp">Total XP: ${totalXP}</span>
    <div>
      ${spiderGraph(array_skill_prog)}
    </div>
  `

  const graphSection = document.createElement('div')
  graphSection.classList.add('graph-section')
  graphSection.innerHTML = `
    <h4>Progression</h4>
    <div class="text-center">
        ${generateBar(userData.totalUp, userData.totalDown, userData.auditRatio)}
    </div>
    <div>
        <svg viewBox="0 0 450 210" preserveAspectRatio="none" style="border: 2px solid #D2D2D2;">
            <polyline id="myLine" fill="none" stroke="#B1C1F2" stroke-width="2" points="${points}"></polyline>
        </svg>
    </div>
  `

  const divButton = document.createElement('div') // just for text-center the button
  divButton.classList.add('text-center')
  const logoutButton = document.createElement('button')
  divButton.appendChild(logoutButton)
  logoutButton.type = 'button'
  logoutButton.classList.add('btn', 'btn-primary', 'text-center')
  logoutButton.textContent = 'Logout'
  logoutButton.setAttribute('style', 'margin: 0 auto; margin-top: 0.5rem; background: #F8F8F8; border-color: #B1C1F2; color: black;')
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user_login')
    window.location.reload(true) // reset all elements of the DOM
    /*
    variables, event, all elements are reset
    And true it's to force browser at make de Ctrl F5
        browser can used cached data rather than making a request to the server again
        but with true we force the browser to make a request to the server and take fresh data
    */
  })
  // AddEventListener on the button because no CSS file
  logoutButton.addEventListener('mouseover', function() {
    logoutButton.style.background = '#B1C1F2'
    logoutButton.style.color = 'white'
  })
  logoutButton.addEventListener('mouseout', function() { // without mouseout, hover never come back hidden
    logoutButton.style.background = '#F8F8F8'
    logoutButton.style.color = 'black'
  })

  // Can't appendchild 2 times one element for the same parent
  const divSeparation1 = document.createElement('div') // separation segment
  divSeparation1.classList.add('border-bottom', 'mb-3')
  const divSeparation2 = document.createElement('div')
  divSeparation2.classList.add('border-bottom', 'mb-3')

  document.body.appendChild(section);
  section.appendChild(container);
  //section.appendChild(userInfoContainer); // see graphQL request under card (userInfocontainer on the top of user_page.js)
  container.appendChild(row);
  row.appendChild(col);
  col.appendChild(card);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  cardBody.appendChild(divName);
  cardBody.appendChild(divSeparation1);
  cardBody.appendChild(profileSection);
  cardBody.appendChild(divSeparation2);
  cardBody.appendChild(graphSection);
  cardBody.appendChild(divButton);
  // Can appendchild all the element in cardbody with appendchildren
}

function generateBar(totalUp, totalDown, auditRatio) {
    const total = totalUp + totalDown
    const upPercentage = (totalUp / total) * 100
    const downPercentage = (totalDown / total) * 100

    const svg = `
        <div class="text-center">
            <pre>Audit ratio: ${Math.round(auditRatio * 100) / 100}</pre>
            <svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
                <rect width="${upPercentage}%" height="50" fill="#D9F7CD"/>
                <text x="10" y="30" fill="black">
                  <tspan fill="green" x="55">▲</tspan>
                  <tspan fill="black">${formatSize(totalUp)}</tspan>
                </text>
                <text x="${upPercentage + 5}%" y="30" fill="black">${totalUp}</text>
                <rect x="${upPercentage}%" width="${downPercentage}%" height="50" fill="#FFC7C7"/>
                <text x="${upPercentage + 5}%" y="30" fill="black">
                  <tspan fill="red" x="255">▼</tspan>
                  <tspan fill="black"> ${formatSize(totalDown)}</tspan>
                </text>
            </svg>
        </div>
    `;
    return svg
}

function spiderGraph(transactData) {

  // Polygons for representing skills
  const width = 400
  const height = 300
  const radius = Math.min(width, height) / 2 - 30
  const polyPoints = transactData.map((value, index) => {
    const angle = (Math.PI * 2 * index) / transactData.length - Math.PI / 2; // Math.PI / 2 allows reduce angle by 90°
    const x = (width / 2) + (radius * value.amount) / 100 * Math.cos(angle);
    const y = (height / 2)+ (radius * value.amount) / 100 * Math.sin(angle);
    return `${x},${y}`;
  });
  console.log('PolyPoints for spider graph: ', polyPoints)

  const svg = `
      <div class="text-center">
        <pre style="margin-bottom: 0rem; margin-top: 0.5rem;">Best Skills</pre>
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="120" fill="none" stroke="#D2D2D2" stroke-width="2"></circle>
          <line x1="200" y1="270" x2="200" y2="30" stroke="#D2D2D2" stroke-width="2"></line>
          <line x1="95" y1="210" x2="305" y2="90" stroke="#D2D2D2" stroke-width="2"></line>
          <line x1="95" y1="90" x2="305" y2="210" stroke="#D2D2D2" stroke-width="2"></line>
          <text x="200" y="17" fill="black" font-size="14px" text-anchor="middle" alignment-baseline="middle">Prog</text>
          <text x="320" y="85" fill="black" font-size="14px" text-anchor="middle" alignment-baseline="middle">Go</text>
          <text x="340" y="215" fill="black" font-size="14px" text-anchor="middle" alignment-baseline="middle">Back-End</text>
          <text x="200" y="283" fill="black" font-size="14px" text-anchor="middle" alignment-baseline="middle">Front-End</text>
          <text x="82" y="215" fill="black" font-size="14px" text-anchor="middle" alignment-baseline="middle">Js</text>
          <text x="77" y="85" fill="black" font-size="14px" text-anchor="middle" alignment-baseline="middle">Algo</text>
          <polygon points="${polyPoints.join(' ')}" fill="#B1C1F2"></polygon>
        </svg>
      </div>
  `;
  // perfect horizontal line : <line x1="80" y1="150" x2="320" y2="150" stroke="#D2D2D2" stroke-width="2"></line>
  // perfect diagonale line : <line x1="110" y1="230" x2="290" y2="70" stroke="#D2D2D2" stroke-width="2"></line>
  // perfect opposed diagonale line : <line x1="110" y1="70" x2="290" y2="230" stroke="#D2D2D2" stroke-width="2"></line>
  return svg
}

// Return transacts with actual skills lvl
function transactSkill(allTransactInfo){
  let obj1 ={
      amount: 0,
      createdAt: "",
      id: 0,
      objectId: 0,
      path: "",
      type: "",
      userId: 0
  }
  let obj = {
      go : obj1,
      js : obj1,
      algo : obj1,
      front : obj1,
      back : obj1,
      prog : obj1
  }
  for(let i = 0; i < allTransactInfo.length-1; i++){
      let transact = allTransactInfo[i].type;
      switch (transact){
          case "skill_prog":
              if (allTransactInfo[i].amount > obj.prog.amount){
                  obj.prog = allTransactInfo[i];
              }
              break
          
          case "skill_go":
              if (allTransactInfo[i].amount > obj.go.amount){
                  obj.go = allTransactInfo[i];
              }
              break

          case "skill_js":
              if (allTransactInfo[i].amount > obj.js.amount){
                  obj.js = allTransactInfo[i];
              }
              break

          case "skill_front-end":
              if (allTransactInfo[i].amount > obj.front.amount){
                  obj.front = allTransactInfo[i];
              }
              break

          case "skill_back-end":
              if (allTransactInfo[i].amount > obj.back.amount){
                  obj.back = allTransactInfo[i];
              }
              break

          case "skill_algo":
              if (allTransactInfo[i].amount > obj.algo.amount){
                  obj.algo = allTransactInfo[i];
              }
              break
          default:
              break
      }
  }
  let array = [];
  array.push(obj.prog);
  array.push(obj.go);
  array.push(obj.back);
  array.push(obj.front);
  array.push(obj.js);
  array.push(obj.algo);
  return array
}