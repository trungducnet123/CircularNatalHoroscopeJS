function calculatePratianterDasha(birthdayArray, anterdasha) {
    // Anterdasha durations in days corresponding to their numbers
    const anterdashaDays = {1: 8, 2: 16, 3: 24, 4: 32, 5: 40, 6: 48, 7: 56, 8: 84, 9: 72};
  
    // Parse the birthday array into a Date object (Year, Month-1 for 0-based index, Day)
    let birthday = new Date(parseInt(birthdayArray[2]), parseInt(birthdayArray[1]) - 1, parseInt(birthdayArray[0]));
  
    // Initialize the dictionary for storing results
    let result = {};
    
    // Initialize the starting anterdasha
    let currentAnterdasha = anterdasha;
    
    // Run the loop for all 9 cycles of Anterdasha
    for (let count = 0; count < 9; count++) {
      // Convert date to string for dictionary key
      let formattedDate = birthday.toISOString().split('T')[0]; // yyyy-mm-dd format
  
      // Store the current date in the dictionary along with the current anterdasha number
      result[formattedDate] = `${currentAnterdasha}`;
  
      // Add the anterdasha duration in days to the current date
      let daysToAdd = anterdashaDays[currentAnterdasha];
      birthday.setDate(birthday.getDate() + daysToAdd);
  
      // Increment the anterdasha (wrap around if it exceeds 9)
      currentAnterdasha = (currentAnterdasha % 9) + 1;
    }
  
    return result;
  }
  
  // Example Usage
  let birthdayArray = ["14", "2", "2002"];  // Example birthday: 14th Feb 2002
  let anterdasha = 9;  // Example anterdasha: 9
  
  let pratianterDashaResult = calculatePratianterDasha(birthdayArray, anterdasha);
  console.log(pratianterDashaResult);
  