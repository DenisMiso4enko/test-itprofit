import "./index.html";
import "./index.scss";
import IMask from "imask";
import "./modules/validation";

IMask(document.getElementById("phone"), {
  mask: "+{375} (00) 000-00-00",
});
