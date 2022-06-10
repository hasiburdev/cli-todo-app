import fs from "fs";

export const saveFile = (data, fileName) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data));
  } catch (error) {
    console.log(e.message);
    throw new Error(e);
  }
};

export const readFile = (fileName) => {
  try {
    return JSON.parse(fs.readFileSync(fileName, "utf-8"));
  } catch (error) {
    console.log(e.message);
    throw new Error(e);
  }
};
