import { randomInt } from "crypto";
import { MAX_RANDOM } from "src/consts";

export const getDateNow = () => new Date(Date.now());
export const getRandomNumber = () => randomInt(MAX_RANDOM);