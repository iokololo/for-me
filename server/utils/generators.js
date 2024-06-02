function generateRandomArrays() {
  const arraysCount = 4;
  const arrayLength = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateRandomItem() {
    let item = "";
    for (let i = 0; i < arrayLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      item += characters[randomIndex];
    }
    return item;
  }

  function getRandomDataType() {
    return Math.random() < 0.5 ? "string" : "number";
  }

  const arrays = [];

  for (let i = 0; i < arraysCount; i++) {
    const newArray = [];
    for (let j = 0; j < arrayLength; j++) {
      const dataType = getRandomDataType();
      if (dataType === "string") {
        newArray.push(generateRandomItem());
      } else if (dataType === "number") {
        newArray.push(Math.floor(Math.random() * 1000)); // Adjust the range as needed
      }
    }
    arrays.push(newArray);
  }

  return arrays.map((i) => i.join("-")).join("-");
}

// Example usage:
export default generateRandomArrays;

export const generateRandomPhoneCode = () => {
  const characters = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};
