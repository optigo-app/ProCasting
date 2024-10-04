export function convertToMilliseconds(mode) {
    // Split the time string into an array of [hours, minutes, seconds]

    let Initmfg = JSON.parse(localStorage.getItem("initmfg"))

    let H;
    let M;
    let S;

    if(mode == "unlock"){
      H=Initmfg?.alloyingHH;
      M=Initmfg?.alloyingMM;
      S=Initmfg?.alloyingSS;
    }

    if(mode == "burnout"){
      H=Initmfg?.burnoutHH;
      M=Initmfg?.burnoutMM;
      S=Initmfg?.burnoutSS;
    }

    if(mode == "invest"){
      H=Initmfg?.investmentHH;
      M=Initmfg?.investmentMM;
      S=Initmfg?.investmentSS;
    }
    // const [hours, minutes, seconds] = timeString.split(',').map(Number);
  
    // Convert hours, minutes, and seconds to milliseconds
    const hoursInMs = H * 60 * 60 * 1000;
    const minutesInMs = M * 60 * 1000;
    const secondsInMs = S * 1000;
  
    // Sum all milliseconds
    return hoursInMs + minutesInMs + secondsInMs;
  }

  export const TotalTime = (mode) =>{
    let Initmfg = JSON.parse(localStorage.getItem("initmfg"))

    let H;
    let M;
    let S;

    if(mode == "unlock"){
      H=Initmfg?.alloyingHH;
      M=Initmfg?.alloyingMM;
      S=Initmfg?.alloyingSS;
    }

    if(mode == "burnout"){
      H=Initmfg?.burnoutHH;
      M=Initmfg?.burnoutMM;
      S=Initmfg?.burnoutSS;
    }

    if(mode == "invest"){
      H=Initmfg?.investmentHH;
      M=Initmfg?.investmentMM;
      S=Initmfg?.investmentSS;
    }

    return `${H}:${M}:${S} Hours`
  }