"use strict";

/**
 * (1) Bedingungen und Objekte (Inspiration: EidP, Aufgabe 01 von 07)
 *
 * Die Funktion bmiCalculator berechnet abhängig von den drei Parametern...
 *
 * @param gender Angabe, ob Person männlich ('m'/'M') oder weiblich ('w'/'W') ist.
 * @param height Angabe, wie groß die Person ist in [cm].
 * @param weight Angabe, wie schwer die Person ist in [kg].
 *
 * ... den BMI-Wert einer Person.
 *
 * @returns Der Rückgabewert ist ein Objekt, welches folgende Informationen enthält:
 * {
 *   gender:    Das angegebene Geschlecht ausgeschrieben als 'männlich' oder 'weiblich'.
 *   height:    Die angegebene Größe in Metern und mit maximal zwei Nachkommastellen.
 *   weight:    Das angegebene Gewicht in Kilogramm.
 *   bmi:       Der berechnete BMI mit maximal zwei Nachkommastellen.
 *   text:      Die Bedeutung des BMI-Werts als Kurztext. Die Bedeutung kannst du der WHO-Tabelle
 *              (https://www.euro.who.int/en/health-topics/disease-prevention/nutrition/a-healthy-lifestyle/body-mass-index-bmi)
 *              entnehmen.
 * }
 */
const bmiCalculator = (gender, height, weight) => {
  let person = {
    gender: gender,
    height: height,
    weight: weight,
    bmi: 0,
    text: "",
  };
  person.bmi = (weight / Math.pow(height / 100, 2)).toFixed(2);

  if (person.gender.toUpperCase() == "M") {
    person.gender = "männlich";
  } else if (person.gender.toUpperCase() == "W") {
    person.gender = "weiblich";
  }

  person.height = (person.height / 100).toFixed(2) + "m";

  if (person.bmi <= 18.5) {
    person.text = "Underweigth";
  } else if (person.bmi < 24.9) {
    person.text = "Normal weigth";
  } else if (person.bmi < 29.9) {
    person.text = "Pre-obesity";
  } else if (person.bmi < 34.9) {
    person.text = "Obesity class I";
  } else if (person.bmi < 39.9) {
    person.text = "Obesity class II";
  } else if (person.bmi >= 40) {
    person.text = "Obesity class III";
  }

  return person;
};

console.log(bmiCalculator("m", 200, 100));
console.log(bmiCalculator("W", 170, 65));

/**
 * (2) Schleifen und Listen (Inspiration: PS1, Aufgabe 03 von 09)
 *
 * Die Funktion characteristics berechnet für mehrere natürliche Zahlen ab der Zahl 0 mehrere Kennwerte.
 * Dabei werden für die Zahlen zwischen lowerBorder und upperBorder Kennwerte berechnet.
 * Diese Kennwerte werden pro Zahl als Objekte angelegt. Die Objekte selbst werden einer Liste hinzugefügt.
 *
 * @param lowerBorder Die kleinste Zahl, für die die Kennwerte berechnet werden.
 * @param upperBorder Die größte Zahl, für die die Kennwerte berechnet werden.
 *
 * @returns Der Rückgabewert ist eine Liste von Objekten, also die Liste der Kennwerte,
 *          wobei jedes Objekt folgende Informationen enthält:
 * {
 *   number:    Die natürliche Zahl, die in diesem Objekt ausgewertet wird.
 *   isEven:    Eine boolsche Angabe darüber, ob die Zahl eine gerade Zahl ist.
 *   collatz:   Die ersten vier Zahlen der Collatz-Folge.
 *              Ein Zahl wird halbiert, wenn sie gerade ist, ansonsten wird die Zahl * 3 + 1 gerechnet.
 *              Die Berechnung der Collatz-Folge kann abgebrochen werden, wenn die Zahl 1 erreicht wurde.
 *              siehe auch Wikipedia: https://de.wikipedia.org/wiki/Collatz-Problem
 * }
 */
const characteristics = (lowerBorder, upperBorder) => {
  let res = [];
  for (let i = lowerBorder; i <= upperBorder; ++i) {
    let tmp = {};
    tmp.number = i;
    tmp.isEven = i % 2 == 0;
    tmp.collatz = [i];
    while (tmp.collatz.length < 4 && tmp.collatz[tmp.collatz.length - 1] != 1) {
      if (tmp.collatz[tmp.collatz.length - 1] % 2 == 0) {
        tmp.collatz.push(tmp.collatz[tmp.collatz.length - 1] / 2);
      } else tmp.collatz.push(tmp.collatz[tmp.collatz.length - 1] * 3 + 1);
    }
    res.push(tmp);
  }
  return res;
};

console.log(characteristics(0, 12));
console.log(characteristics(1098, 1101));

/**
 * (3) Strukturierte Daten
 *
 * Das Listen-Objekt data enthält strukturierte Daten, also Objekte, die mehrere Attribute aufweisen.
 * Überlege dir selbst Daten, die du in einer Liste verwalten möchtest.
 * Jedes Datenobjekt sollte aber mindestens drei Attribute aufweisen,
 * wobei folgende Datentypen mindestens einmal vorkommen müssen:
 *
 * - string
 * - number
 * - boolean
 *
 * Lege anschließend 7 solcher Daten-Objekte an, die im Listen-Objekt data enthalten sind.
 * Die 7 Daten-Objekte müssen sich voneinander unterscheiden.
 */
const data = [
  {
    name: "Angular",
    preis: 40,
    seiten: 1230,
    verfuegbar: true,
  },
  {
    name: "React",
    preis: 44,
    seiten: 760,
    verfuegbar: false,
  },
  {
    name: "Vue",
    preis: 35,
    seiten: 1103,
    verfuegbar: true,
  },
  {
    name: "Die Gefährten",
    preis: 10,
    seiten: 487,
    verfuegbar: false,
  },
  {
    name: "Die Zwei Türme",
    preis: 11,
    seiten: 404,
    verfuegbar: true,
  },
  {
    name: "Die Rückkehr des Königs",
    preis: 12,
    seiten: 460,
    verfuegbar: false,
  },
  {
    name: "Homo faber",
    preis: 1,
    seiten: 210,
    verfuegbar: true,
  },
];

/**
 * (4) Funktionen
 *
 * Erstelle eine Funktion, die auf deinem Daten-Objekt definiert ist.
 * Das heißt, es soll als ersten Parameter ein Daten-Objekt erwarten, dass so strukturiert ist wie in (3) gefordert wird.
 *
 * Überlege dir ein Kriterium, wonach die Funktion manches Mal false und manches Mal true zurückgibt.
 * Wir verwenden diese Funktion später in (5) als Filter-Funktion.
 *
 * Schreibe zwei Testaufrufe und gebe sie mit console.log aus. Orientiere dich dabei an die Vorgaben aus (1) und (2).
 * Ergänze anschließend die nachfolgende Dokumentation:
 *
 * @param element Ein Daten-Objekt, das wie folgt strukturiert ist:
 * {
 *  name:string,
 *  preis:number,
 *  verfuegbar:boolean
 * }
 *
 * @returns     true, wenn Das Objekt Verfuegbar ist
 *              false, wenn Das Objekt nicht Verfuegbar ist
 */
function IsVerfuegbar(data) {
  return data.verfuegbar;
}

console.log(IsVerfuegbar(data[5]));
console.log(IsVerfuegbar(data[2]));


/**
 * (5) Listenoperationen
 *
 * Verwende die Array-Iterationsfunktion filter.
 * Wie die Funktion definiert ist, kannst du auf den MDN-Seiten nachlesen:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *
 * Diese Iterationsfunktion soll auf dem Listen-Objekt aus (3) aufgerufen werden.
 * Als Callback-Funktion soll deine Funktion aus (4) wiederverwendet werden.
 *
 * Schreibe einen Testaufruf und gebe sie mit console.log aus. Orientiere dich dabei an die Vorgaben aus (1) und (2).
 *
 * Das gefilterte Ergebnis enthält mindestens ein Element und maximal ein Element weniger als es insgesamt an Daten gibt;
 * passe ggf. deine Funktion aus (4) nachträglich an, um diese Vorgaben zu erfüllen.
 */

console.log(data.filter((dat) => IsVerfuegbar(dat)));
console.log(
  data.filter((dat) => {
    return dat.seiten > 500;
  })
);
