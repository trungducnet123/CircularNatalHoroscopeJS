function getMahadashaForYear(startYear, birthYear, rootNumber) {
    const mahadashaOrder = [
        { number: 1, duration: 1 }, // Sun
        { number: 2, duration: 2 }, // Moon
        { number: 3, duration: 3 }, // Jupiter
        { number: 4, duration: 4 }, // Rahu
        { number: 5, duration: 5 }, // Mercury
        { number: 6, duration: 6 }, // Venus
        { number: 7, duration: 7 }, // Ketu
        { number: 8, duration: 8 }, // Saturn
        { number: 9, duration: 9 }  // Mars
    ];

    let index = (rootNumber - 1); // Adjust index to match root number
    let year = birthYear;
    const yearToMahadasha = {};

    // Calculate Mahadasha for each year from the birth year up to 45 years after the startYear
    while (year <= startYear + 45) {
        const mahadasha = mahadashaOrder[index % mahadashaOrder.length];

        // Assign Mahadasha for each year within its duration
        for (let i = 0; i < mahadasha.duration; i++) {
            if (year > startYear + 45) break; // Stop if the year exceeds the range
            yearToMahadasha[year] = mahadasha.number;
            year++;
        }

        index = (index + 1) % mahadashaOrder.length; // Move to the next planet in the cycle
    }

    // Adjust the Mahadasha values to align correctly within the 45-year period from the startYear
    const adjustedYearToMahadasha = {};
    for (let year = startYear; year <= startYear + 45; year++) {
        if (yearToMahadasha[year]) {
            adjustedYearToMahadasha[year] = yearToMahadasha[year];
        }
    }

    return adjustedYearToMahadasha;
}


  // Function to get the day of the week number
  function getDayOfWeekNumber(birthdayArray, year) {
    const [day, month] = birthdayArray.map(Number);

    // Create a Date object for the given birthday in the specified year
    const birthdayDate = new Date(year, month - 1, day); // JavaScript months are 0-based

    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const dayOfWeek = birthdayDate.getDay();
    //console.log(dayOfWeek);

    // Map days of the week to corresponding numbers
    const dayNumberMap = {
        0: 1, // Sunday
        1: 2, // Monday
        2: 9, // Tuesday
        3: 5, // Wednesday
        4: 3, // Thursday
        5: 6, // Friday
        6: 8  // Saturday
    };

    // Return the corresponding number for the day of the week
    var add1 = Number(year.toString().split("")[2])+Number(year.toString().split("")[3]);
    add1 += addn(Number(birthdayArray[0]))+addn(Number(birthdayArray[1]))+dayNumberMap[dayOfWeek];
    //console.log(dayNumberMap[dayOfWeek])
    return addn(add1);
  }

//   function cloneTablesWithMahadashaAndDay(startYear, endYear, birthYear, rootNumber, birthdayArray) {
//     // Get the original table
//     const originalTable = document.getElementById('god');
    
//     // Container where cloned tables will be added
//     const container = document.getElementById('tableContainer');
    
//     // Get the Mahadasha map for each year
//     const yearToMahadasha = getMahadashaForYear(startYear, birthYear, rootNumber);
    
//     // Clear previous tables from the container
//     container.innerHTML = '';
    
//     // Define cell positions for Mahadasha and Day of the Week number updates
//     const cellPositions = {
//       'R1C1': 3, 'R1C2': 1, 'R1C3': 9,
//       'R2C1': 6, 'R2C2': 7, 'R2C3': 5,
//       'R3C1': 2, 'R3C2': 8, 'R3C3': 4
//     };
    
//     // Loop through the years from startYear to endYear
//     for (let year = startYear; year <= endYear; year++) {
//       // Clone the original table
//       const clone = originalTable.cloneNode(true);
    
//       // Get the Mahadasha number for the current year
//       const mahadashaNumber = yearToMahadasha[year];
    
//       // Get the Day of the Week number for the current year
//       const dayOfWeekNumber = getDayOfWeekNumber(birthdayArray, year);
    
//       // Get all the rows in the cloned table
//       const rows = clone.getElementsByTagName('tr');
    
//       // Loop through each row
//       for (let r = 0; r < rows.length; r++) {
//         const cells = rows[r].getElementsByTagName('td');
    
//         // Loop through each cell in the row
//         for (let c = 0; c < cells.length; c++) {
//           const cell = cells[c];
//           const cellPosition = `R${r + 1}C${c + 1}`;
//           const cellOriginalValue = cell.innerText.trim();
          
//           // Create the new content based on cell position
//           let newContent = cellOriginalValue;
//             newContent += "\u00A0";
//           // Append Mahadasha number based on cell position
//           if (mahadashaNumber == cellPositions[cellPosition]) {
//             newContent += mahadashaNumber;
//           }
  
//           // Append Day of the Week number based on cell position
//           if (dayOfWeekNumber == cellPositions[cellPosition]) {
//             newContent += dayOfWeekNumber;
//           }
  
//           // Update the cell's inner text
//           cell.innerText = newContent;
//         }
//       }
    
//       // Create a title element for the table (using <h3> for example)
//       const title = document.createElement('h3');
//       title.innerText = `Year: ${year} (Mahadasha: ${mahadashaNumber}, Antradasha: ${dayOfWeekNumber})`;
    
//       // Append the title and cloned table to the container
//       container.appendChild(title);
//       container.appendChild(clone);
//     }
//   }
function calculatePratianterDasha(birthdayArray, anterdasha) {
    // Anterdasha durations in days corresponding to their numbers
    const anterdashaDays = {1: 8, 2: 16, 3: 24, 4: 32, 5: 40, 6: 48, 7: 56, 8: 64, 9: 72};

    // Parse the birthday array into a Date object (Year, Month-1 for 0-based index, Day)
    let birthday = new Date(parseInt(birthdayArray[2]), parseInt(birthdayArray[1]) - 1, parseInt(birthdayArray[0]));

    // Increment the initial date by 1 day for the first period
    birthday.setDate(birthday.getDate());

    // Initialize the dictionary for storing results
    let result = {};

    // Initialize the starting anterdasha
    let currentAnterdasha = anterdasha;
    
    // Run the loop for all 9 cycles of Anterdasha
    for (let count = 0; count < 9; count++) {
        // Add the anterdasha duration in days to the current date
        let daysToAdd = anterdashaDays[currentAnterdasha];
        let endDate = new Date(birthday);
        endDate.setDate(endDate.getDate() + daysToAdd);

        // Convert end date to string for dictionary key (yyyy-mm-dd format)
        let formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

        // Store the end date in the dictionary along with the current anterdasha number
        result[formattedEndDate] = `${currentAnterdasha}`;

        // Increment the birthday date by the anterdasha duration
        birthday.setDate(birthday.getDate() + daysToAdd);

        // Increment the anterdasha (wrap around if it exceeds 9)
        currentAnterdasha = (currentAnterdasha % 9) + 1;
    }
    //console.log(result)
    return result;
}

function cloneTablesWithMahadashaAndDay(startYear, endYear, birthYear, rootNumber, birthdayArray) {
    // Get the original table
    const originalTable = document.getElementById('god');
    
    // Container where cloned tables will be added
    const container = document.getElementById('tableContainer');
    
    // Get the Mahadasha map for each year
    const yearToMahadasha = getMahadashaForYear(startYear, birthYear, rootNumber);
    
    // Clear previous tables from the container
    container.innerHTML = '';
    //console.log(birthdayArray);
    // Define cell positions for Mahadasha and Day of the Week number updates
    const cellPositions = {
      'R1C1': 3, 'R1C2': 1, 'R1C3': 9,
      'R2C1': 6, 'R2C2': 7, 'R2C3': 5,
      'R3C1': 2, 'R3C2': 8, 'R3C3': 4
    };
    
    // Loop through the years from startYear to endYear
    for (let year = startYear; year <= endYear; year++) {
      // Clone the original table
      const clone = originalTable.cloneNode(true);
    
      // Get the Mahadasha number for the current year
      const mahadashaNumber = yearToMahadasha[year];
    
      // Get the Day of the Week number for the current year
      const dayOfWeekNumber = getDayOfWeekNumber(birthdayArray, year);
      //console.log(year);
      //console.log(birthdayArray, year, dayOfWeekNumber);
    
      // Get all the rows in the cloned table
      const rows = clone.getElementsByTagName('tr');
    
      // Loop through each row
      for (let r = 0; r < rows.length; r++) {
        const cells = rows[r].getElementsByTagName('td');
    
        // Loop through each cell in the row
        for (let c = 0; c < cells.length; c++) {
          const cell = cells[c];
          const cellPosition = `R${r + 1}C${c + 1}`;
          const cellOriginalValue = cell.innerText.trim();
          
          // Create the new content based on cell position
          let newContent = cellOriginalValue;
          newContent += "\u00A0";
          
          // Append Mahadasha number in red color based on cell position
          if (mahadashaNumber == cellPositions[cellPosition]) {
            newContent += `<span style="color: red;font-weight:bold;">${mahadashaNumber}</span>`;
          }
  
          // Append Day of the Week number in green color based on cell position
          if (dayOfWeekNumber == cellPositions[cellPosition]) {
            newContent += `<span style="color: blue;font-weight:bold;">${dayOfWeekNumber}</span>`;
          }
  
          // Update the cell's inner HTML
          cell.innerHTML = newContent;
        }
      }
    
      // Create a title element for the table (using <h3> for example)
      const title = document.createElement('h3');
      title.innerHTML = `Year: ${year} <span style="color: red;">Mahadasha: ${mahadashaNumber}</span>, <span style="color: blue;">Antradasha: ${dayOfWeekNumber}</span>`;
      title.style.textAlign = 'center';  // Center align the title
    
      // Fetch Pratianter Dasha results for the current year
      const pratianterDashaResults = calculatePratianterDasha(birthdayArray, dayOfWeekNumber);
      
      // Create a new 2x9 table
      const pratianterTable = document.createElement('table');
      pratianterTable.style.borderCollapse = 'collapse';
      pratianterTable.style.width = '100%';
      pratianterTable.style.textAlign = 'center';
      
      // Create table rows
      const row1 = pratianterTable.insertRow();
      const row2 = pratianterTable.insertRow();
      
      // Add the dates and corresponding dasha numbers to the table
      Object.entries(pratianterDashaResults).forEach(([date, dasha]) => {
        const cell1 = row1.insertCell();
        cell1.style.border = '1px solid black';
        cell1.innerText = date.split('-').slice(2, 3).concat(date.split('-').slice(1, 2)).join('-');
        
        const cell2 = row2.insertCell();
        cell2.style.border = '1px solid black';
        cell2.innerHTML = `<span style="color: green;">${dasha}</span>`;
      });
      
      // Append the title, cloned table, and new 2x9 table to the container
      container.appendChild(title);
      container.appendChild(clone);
      container.appendChild(pratianterTable);
    }
}
