console.oldLog = console.log;

console.log = (...input) => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const milliseconds = currentDate.getMilliseconds();
  const seconds = currentDate.getSeconds();
  const minutes = currentDate.getMinutes();
  const hours = currentDate.getHours();
  if (input.length > 0) {
    console.oldLog(
      `\x1b[35m[${day}-${month}-${year}: ${hours}:${minutes}:${seconds}.${milliseconds}]\x1b[0m`,
      ...input
    );
  } else {
    console.oldLog(
      `\x1b[35m[${day}-${month}-${year}: ${hours}:${minutes}:${seconds}.${milliseconds}]\x1b[0m`,
      "\x1b[34m[ Empty console.log() ]\x1b[0m"
    );
  }
};

console.load = (...input) => {
  console.log(`\x1b[32m[LOAD]\x1b[0m`, ...input);
};

console.warning = (...input) => {
  console.log(`\x1b[33m[WARNING]\x1b[0m`, ...input);
};
