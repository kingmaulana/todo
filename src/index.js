// index.js
import "./style.css"
import { greeting } from "./greeting.js";
import { format, compareAsc } from "date-fns"

const h1 = document.querySelector('h1')
const date = format(new Date(), "MM/dd/yyyy")

h1.innerText = date