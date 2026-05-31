/* ================= PAGE ROUTING ================= */

const pages = {
    home: document.getElementById("page-home"),
    login: document.getElementById("page-login"),
    "hospital-login": document.getElementById("page-hospital-login"),
    "doctor-login": document.getElementById("page-doctor-login"),
    "staff-dashboard": document.getElementById("page-staff-dashboard"),
    "doctor-dashboard": document.getElementById("page-doctor-dashboard"),
    "patient-lookup": document.getElementById("page-patient-lookup"),
    otp: document.getElementById("page-otp"),
    treatments: document.getElementById("page-treatments"),
    appointment: document.getElementById("page-appointment"),
    payment: document.getElementById("page-payment"),
    done: document.getElementById("page-done"),
    about: document.getElementById("page-about"),
    contact: document.getElementById("page-contact"),
    feedback: document.getElementById("page-feedback")
  };
  
  function show(route) {
    Object.values(pages).forEach(p => p.classList.remove("active"));
    (pages[route] || pages.home).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  document.querySelectorAll("[data-route]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      show(el.getAttribute("data-route"));
    });
  });
  
  document.getElementById("year").textContent = new Date().getFullYear();
  
  /* ================= STAFF LOGIN ================= */
  
  const hospitalStaffApp = {
    otp: null,
    maxTokens: {}
  };
  
  document.getElementById("sendHospitalOtp").addEventListener("click", () => {
    const email = document.getElementById("hospitalEmail").value.trim();
  
    if (!email) {
      alert("Please enter hospital email first.");
      return;
    }
  
    hospitalStaffApp.otp = (Math.floor(Math.random()*900000)+100000).toString();
  
    document.getElementById("hospitalOtpSentMsg").textContent =
      `OTP sent (demo): ${hospitalStaffApp.otp}`;
  
    document.getElementById("hospitalLoginBtn").disabled = false;
  });
  
  document.getElementById("hospitalStaffLoginForm").addEventListener("submit", e => {
  
    e.preventDefault();
  
    const enteredOtp = document.getElementById("hospitalOtpInput").value.trim();
  
    if (enteredOtp === hospitalStaffApp.otp) {
      show("staff-dashboard");
    } else {
      alert("Invalid OTP.");
    }
  });
  
  /* ================= DOCTOR LOGIN ================= */
  
  const doctorApp = {
    otp: null,
    currentToken: 1,
    maxToken: 50
  };
  
  document.getElementById("sendDoctorOtp").addEventListener("click", () => {
  
    const email = document.getElementById("doctorEmail").value.trim();
  
    if (!email) {
      alert("Please enter hospital email first.");
      return;
    }
  
    doctorApp.otp = (Math.floor(Math.random()*900000)+100000).toString();
  
    document.getElementById("doctorOtpSentMsg").textContent =
      `OTP sent (demo): ${doctorApp.otp}`;
  
    document.getElementById("doctorLoginBtn").disabled = false;
  });
  
  document.getElementById("doctorLoginForm").addEventListener("submit", e => {
  
    e.preventDefault();
  
    const enteredOtp = document.getElementById("doctorOtpInput").value.trim();
  
    if (enteredOtp === doctorApp.otp) {
  
      updateDoctorDashboard();
      show("doctor-dashboard");
  
    } else {
  
      alert("Invalid OTP.");
  
    }
  });
  
  /* ================= STAFF DASHBOARD ================= */
  
  document.getElementById("saveMaxTokens").addEventListener("click", () => {
  
    document.querySelectorAll(".max-token-input").forEach(input => {
  
      const dept = input.getAttribute("data-dept");
      const value = parseInt(input.value) || 0;
  
      hospitalStaffApp.maxTokens[dept] = value;
  
    });
  
    alert("Maximum tokens saved successfully!");
  
  });
  
  /* ================= DOCTOR DASHBOARD ================= */
  
  function updateDoctorDashboard(){
    document.getElementById("currentTokenNo").textContent = doctorApp.currentToken;
  }
  
  document.getElementById("nextToken").addEventListener("click", () => {
  
    if (doctorApp.currentToken < doctorApp.maxToken){
      doctorApp.currentToken++;
      updateDoctorDashboard();
    }
  
  });
  
  document.getElementById("prevToken").addEventListener("click", () => {
  
    if (doctorApp.currentToken > 1){
      doctorApp.currentToken--;
      updateDoctorDashboard();
    }
  
  });
  
  document.getElementById("markDone").addEventListener("click", () => {
  
    alert(`Token ${doctorApp.currentToken} marked as Done!`);
  
    if (doctorApp.currentToken < doctorApp.maxToken){
      doctorApp.currentToken++;
      updateDoctorDashboard();
    }
  
  });
  
  document.getElementById("markWaiting").addEventListener("click", () => {
    alert(`Token ${doctorApp.currentToken} marked as Waiting!`);
  });
  
  /* ================= FEEDBACK ================= */
  
  document.getElementById("feedback-submit").addEventListener("click", () => {
  
    alert("Feedback submitted!");
    document.getElementById("feedback-input").value = "";
  
  });
  
  /* ================= DEMO DATA ================= */
  
//   const data = {
//     "West Bengal":{
//       "Kolkata":[
//         {
//           id:"WB-KOL-001",
//           name:"NRS Medical College & Hospital",
//           address:"138 AJC Bose Rd, Kolkata",
//           doctors:[
//             {name:"Dr. A. Sen", dept:"Medicine"},
//             {name:"Dr. R. Ghosh", dept:"Orthopedics"}
//           ],
//           treatments:["General Medicine OPD","Orthopedics OPD","Pediatrics OPD"]
//         }
//       ]
//     }
//   };
const data = {

    "West Bengal": {
      "Kolkata": [
        {
          id:"WB-KOL-001",
          name:"NRS Medical College & Hospital",
          address:"138 AJC Bose Rd",
          treatments:["Medicine","Orthopedics","Pediatrics"]
        },
        {
          id:"WB-KOL-002",
          name:"SSKM Hospital",
          address:"A.J.C Bose Road",
          treatments:["Cardiology","Neurology"]
        },
        {
          id:"WB-KOL-003",
          name:"RG Kar Medical College",
          address:"Khudiram Bose Sarani",
          treatments:["ENT","General Surgery"]
        }
      ],
    
      "Howrah":[
        {
          id:"WB-HOW-001",
          name:"Howrah District Hospital",
          address:"Howrah Maidan",
          treatments:["Medicine","Pediatrics"]
        }
      ]
    },
    
    "Delhi":{
      "New Delhi":[
        {
          id:"DL-ND-001",
          name:"AIIMS Delhi",
          address:"Ansari Nagar",
          treatments:["Cardiology","Neurology","Orthopedics"]
        },
        {
          id:"DL-ND-002",
          name:"Safdarjung Hospital",
          address:"Ring Road",
          treatments:["General Medicine","ENT"]
        }
      ]
    },
    
    "Maharashtra":{
      "Mumbai":[
        {
          id:"MH-MUM-001",
          name:"KEM Hospital",
          address:"Parel",
          treatments:["Medicine","Cardiology"]
        },
        {
          id:"MH-MUM-002",
          name:"JJ Hospital",
          address:"Byculla",
          treatments:["Orthopedics","Neurology"]
        }
      ],
    
      "Pune":[
        {
          id:"MH-PUN-001",
          name:"Sassoon General Hospital",
          address:"Station Road",
          treatments:["Medicine","Pediatrics"]
        }
      ]
    }
    
    };
    
    
    /* GET DROPDOWNS */
    
    const stateSelect = document.getElementById("stateSelect");
    const districtSelect = document.getElementById("districtSelect");
    const hospitalSelect = document.getElementById("hospitalSelect");
    
    
    /* LOAD STATES */
    
    Object.keys(data).forEach(state => {
    
      const option = document.createElement("option");
    
      option.value = state;
      option.textContent = state;
    
      stateSelect.appendChild(option);
    
    });
    
    
    /* STATE CHANGE */
    
    stateSelect.addEventListener("change",function(){
    
    const state = this.value;
    
    districtSelect.innerHTML = `<option value="">-- Select District --</option>`;
    hospitalSelect.innerHTML = `<option value="">-- Select Hospital --</option>`;
    
    hospitalSelect.disabled = true;
    
    if(!state){
    districtSelect.disabled = true;
    return;
    }
    
    districtSelect.disabled = false;
    
    Object.keys(data[state]).forEach(district=>{
    
    const option = document.createElement("option");
    
    option.value = district;
    option.textContent = district;
    
    districtSelect.appendChild(option);
    
    });
    
    });
    
    
    /* DISTRICT CHANGE */
    
    districtSelect.addEventListener("change",function(){
    
    const state = stateSelect.value;
    const district = this.value;
    
    hospitalSelect.innerHTML = `<option value="">-- Select Hospital --</option>`;
    
    if(!district){
    hospitalSelect.disabled = true;
    return;
    }
    
    hospitalSelect.disabled = false;
    
    data[state][district].forEach(hospital=>{
    
    const option = document.createElement("option");
    
    option.value = hospital.id;
    option.textContent = hospital.name;
    
    hospitalSelect.appendChild(option);
    
    });
    
    });
// const hospitalData = {
//     "West Bengal": [
//       "AIIMS Kalyani",
//       "SSKM Hospital",
//       "NRS Medical College and Hospital",
//       "RG Kar Medical College and Hospital",
//       "Calcutta National Medical College"
//     ],
  
//     "Delhi": [
//       "AIIMS Delhi",
//       "Safdarjung Hospital",
//       "Ram Manohar Lohia Hospital",
//       "Lok Nayak Jai Prakash Hospital",
//       "Guru Teg Bahadur Hospital"
//     ],
  
//     "Maharashtra": [
//       "KEM Hospital Mumbai",
//       "JJ Hospital Mumbai",
//       "AIIMS Nagpur",
//       "Sassoon General Hospital Pune",
//       "Government Medical College Nagpur"
//     ],
  
//     "Tamil Nadu": [
//       "Government General Hospital Chennai",
//       "Madras Medical College Hospital",
//       "Rajiv Gandhi Government Hospital",
//       "Coimbatore Medical College Hospital",
//       "Madurai Government Rajaji Hospital"
//     ],
  
//     "Karnataka": [
//       "Victoria Hospital Bangalore",
//       "Bowring and Lady Curzon Hospital",
//       "AIIMS Raebareli",
//       "Mysore Medical College Hospital",
//       "Hubli KIMS Hospital"
//     ],
  
//     "Uttar Pradesh": [
//       "King George's Medical University",
//       "AIIMS Gorakhpur",
//       "AIIMS Rae Bareli",
//       "Lala Lajpat Rai Hospital Kanpur",
//       "Government Medical College Lucknow"
//     ],
  
//     "Gujarat": [
//       "Civil Hospital Ahmedabad",
//       "Government Medical College Surat",
//       "AIIMS Rajkot",
//       "Sir Takhtasinhji Hospital Bhavnagar",
//       "Rajkot Civil Hospital"
//     ],
  
//     "Rajasthan": [
//       "SMS Hospital Jaipur",
//       "AIIMS Jodhpur",
//       "Government Medical College Kota",
//       "PBM Hospital Bikaner",
//       "RNT Medical College Udaipur"
//     ]
//   };
  
  /* ================= PATIENT BOOKING APP ================= */
  
//   const stateSelect = document.getElementById("stateSelect");
//   const districtSelect = document.getElementById("districtSelect");
//   const hospitalSelect = document.getElementById("hospitalSelect");
// const stateSelect = document.getElementById("stateSelect");
// const hospitalSelect = document.getElementById("hospitalSelect");

// stateSelect.addEventListener("change", function () {

//   const selectedState = this.value;

//   hospitalSelect.innerHTML = "<option>Select Hospital</option>";

//   if(hospitalData[selectedState]){
//     hospitalData[selectedState].forEach(hospital => {
//       const option = document.createElement("option");
//       option.value = hospital;
//       option.textContent = hospital;
//       hospitalSelect.appendChild(option);
//     });
//   }

// });
  
  const goOtpBtn = document.getElementById("goOtp");
  
  const contactInput = document.getElementById("contactInput");
  const sendOtpBtn = document.getElementById("sendOtp");
  const otpInput = document.getElementById("otpInput");
  const otpSentMsg = document.getElementById("otpSentMsg");
  const verifyOtpBtn = document.getElementById("verifyOtp");
  
  const treatmentsList = document.getElementById("treatmentsList");
  const chosenHospitalName = document.getElementById("chosenHospitalName");
  
  const goAppointmentBtn = document.getElementById("goAppointment");
  const apptForm = document.getElementById("apptForm");
  
  const payNowBtn = document.getElementById("payNow");
  const payDialog = document.getElementById("payDialog");
  const closePayDialog = document.getElementById("closePayDialog");
  
  const finalTokenEl = document.getElementById("finalToken");
  const currentServingEl = document.getElementById("currentServing");
  
  const downloadJpgBtn = document.getElementById("downloadJpg");
  const receiptCanvas = document.getElementById("receiptCanvas");
  
  /* ================= APP STATE ================= */
  
  const app = {
    selected:{
      state:null,
      district:null,
      hospital:null,
      treatment:null
    },
    otp:null,
    contact:null,
    appt:null,
    paymentMethod:null,
    token:null,
    currentServing:null
  };
  
  /* ================= POPULATE STATES ================= */
  
  function populateStates(){
  
    Object.keys(data).forEach(state => {
  
      const option = new Option(state, state);
      stateSelect.add(option);
  
    });
  
  }
  
  populateStates();
  
  /* ================= STATE CHANGE ================= */
  
  stateSelect.addEventListener("change", ()=>{
  
    districtSelect.innerHTML = '<option value="">-- Select District --</option>';
    hospitalSelect.innerHTML = '<option value="">-- Select Hospital --</option>';
  
    hospitalSelect.disabled = true;
    goOtpBtn.disabled = true;
  
    const st = stateSelect.value;
    app.selected.state = st || null;
  
    if(!st){
      districtSelect.disabled = true;
      return;
    }
  
    districtSelect.disabled = false;
  
    Object.keys(data[st]).forEach(d=>{
      districtSelect.add(new Option(d,d));
    });
  
  });
  
  /* ================= DISTRICT CHANGE ================= */
  
  districtSelect.addEventListener("change", ()=>{
  
    hospitalSelect.innerHTML = '<option value="">-- Select Hospital --</option>';
  
    const st = stateSelect.value;
    const dist = districtSelect.value;
  
    app.selected.district = dist || null;
  
    if(!dist){
      hospitalSelect.disabled = true;
      return;
    }
  
    hospitalSelect.disabled = false;
  
    data[st][dist].forEach(h=>{
      hospitalSelect.add(new Option(h.name, h.id));
    });
  
  });
  
  /* ================= HOSPITAL CHANGE ================= */
  
  hospitalSelect.addEventListener("change", ()=>{
  
    const st = stateSelect.value;
    const dist = districtSelect.value;
  
    const hid = hospitalSelect.value;
  
    if(!hid){
      goOtpBtn.disabled = true;
      return;
    }
  
    app.selected.hospital = data[st][dist].find(h=>h.id===hid);
  
    goOtpBtn.disabled = false;
  
  });
  
  /* ================= OTP SYSTEM ================= */
  
  goOtpBtn.addEventListener("click", ()=>{
    show("otp");
  });
  
  sendOtpBtn.addEventListener("click", ()=>{
  
    const val = contactInput.value.trim();
  
    if(!val){
      alert("Enter phone or email first.");
      return;
    }
  
    app.contact = val;
  
    app.otp = (Math.floor(Math.random()*900000)+100000).toString();
  
    otpSentMsg.textContent = `OTP sent (demo): ${app.otp}`;
  
    verifyOtpBtn.disabled = false;
  
  });
  
  verifyOtpBtn.addEventListener("click", ()=>{
  
    if(otpInput.value.trim() === app.otp){
  
      show("treatments");
      renderTreatments();
  
    }else{
  
      alert("Invalid OTP");
  
    }
  
  });
  
  /* ================= TREATMENTS ================= */
  
  function renderTreatments(){
  
    chosenHospitalName.textContent =
    `${app.selected.hospital.name}, ${app.selected.hospital.address}`;
  
    treatmentsList.innerHTML = "";
  
    app.selected.hospital.treatments.forEach(t=>{
  
      const row = document.createElement("div");
      row.className = "item";
  
      row.innerHTML =
      `<div>${t}</div>
      <div>
        <button class="btn btn-primary">Select</button>
      </div>`;
  
      row.querySelector("button").addEventListener("click", ()=>{
  
        document.querySelectorAll("#treatmentsList .btn")
        .forEach(b=>b.disabled=false);
  
        row.querySelector("button").disabled = true;
  
        app.selected.treatment = t;
  
        goAppointmentBtn.disabled = false;
  
      });
  
      treatmentsList.appendChild(row);
  
    });
  
  }
  
  /* ================= APPOINTMENT ================= */
  
  goAppointmentBtn.addEventListener("click", ()=>{
  
    if(!app.selected.treatment){
      alert("Select treatment first.");
      return;
    }
  
    show("appointment");
  
  });
  
  apptForm.addEventListener("submit", e=>{
  
    e.preventDefault();
  
    const form = new FormData(apptForm);
  
    app.appt = Object.fromEntries(form.entries());
  
    show("payment");
  
  });
  
  /* ================= PAYMENT ================= */
  
  document.querySelectorAll('input[name="pay"]').forEach(r=>{
  
    r.addEventListener("change", ()=>{
  
      app.paymentMethod = r.value;
      payNowBtn.disabled = false;
  
    });
  
  });
  
  payNowBtn.addEventListener("click", ()=>{
  
    payNowBtn.disabled = true;
    payNowBtn.textContent = "Processing...";
  
    setTimeout(()=>{
  
      payNowBtn.textContent = "Pay Now";
  
      payDialog.showModal();
  
    },1400);
  
  });
  
  closePayDialog.addEventListener("click", ()=>{
  
    payDialog.close();
  
    app.token = Math.floor(Math.random()*900)+100;
  
    app.currentServing =
      app.token - Math.floor(Math.random()*10+1);
  
    if(app.currentServing < 1)
      app.currentServing = 1;
  
    finalTokenEl.textContent = app.token;
    currentServingEl.textContent = app.currentServing;
  
    show("done");
  
  });
  
  /* ================= RECEIPT DOWNLOAD ================= */
  
  downloadJpgBtn.addEventListener("click", ()=>{
  
    const canvas = receiptCanvas;
    const ctx = canvas.getContext("2d");
  
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  
    ctx.fillStyle = "#000";
    ctx.font = "28px Arial";
  
    ctx.fillText(app.selected.hospital.name,50,80);
  
    ctx.font = "18px Arial";
  
    ctx.fillText(`Token: ${app.token}`,50,140);
    ctx.fillText(`Current Serving: ${app.currentServing}`,50,180);
    ctx.fillText(`Treatment: ${app.selected.treatment}`,50,220);
  
    const url = canvas.toDataURL("image/jpeg");
  
    const a = document.createElement("a");
  
    a.href = url;
    a.download = `MediTech_Receipt_${app.token}.jpg`;
  
    a.click();
  
  });
  
  /* ================= NAV ================= */
  
  document.getElementById("navGetStarted")
  .addEventListener("click", ()=>show("login"));
