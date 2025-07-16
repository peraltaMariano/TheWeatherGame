// This function takes a latitude and a date (defaulting to today) and returns the current season based on the hemisphere.
export function getSeason(lat, date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const isNorthern = lat >= 0;

  if (isNorthern) {
    if ((month === 12 && day >= 21) || (month <= 3 && (month !== 3 || day < 20))) return "Winter";
    if ((month === 3 && day >= 20) || (month <= 6 && (month !== 6 || day < 21))) return "Spring";
    if ((month === 6 && day >= 21) || (month <= 9 && (month !== 9 || day < 23))) return "Summer";
    return "Autumn";
  } else {
    if ((month === 12 && day >= 21) || (month <= 3 && (month !== 3 || day < 20))) return "Summer";
    if ((month === 3 && day >= 20) || (month <= 6 && (month !== 6 || day < 21))) return "Autumn";
    if ((month === 6 && day >= 21) || (month <= 9 && (month !== 9 || day < 23))) return "Winter";
    return "Spring";
  }
}

export function getWeatherData(conditionCode, isDay) {
    console.log("WeatherData - conditionCode:", conditionCode, "isDay:", isDay);

    const basePath = "Assets/WeatherIcons/";
    const icons = isDay == 1 ? dayIcons : nightIcons;

    if (!icons) {
        console.warn("Icons object is undefined! Falling back to default icon.");
        return {
            iconPath: basePath + "Sunny.png",
            text: "Unknown"
        };
    }

    const data = icons[conditionCode];

    if (!data) {
        console.warn(`Condition code ${conditionCode} not found, using default icon.`);
        return {
            iconPath: basePath + "Sunny.png",
            text: "Unknown"
        };
    }

    return {
        iconPath: basePath + data.icon,
        text: data.text
    };
}


export function extractTime(localtimeString) {
  return localtimeString.slice(-5);
}

export function populateClues(data) {
  const season = getSeason(data.latitude);
  document.getElementById('season-icon').src = seasonIcons[season];
  document.getElementById('season-label').innerText = season;

  const { icon, text } = getWeatherData(data.conditionCode, data.isDay === 1);
  document.getElementById('weather-icon').src = `Assets/WeatherIcons/${icon}`;
  // document.getElementById('weather-label').innerText = text;

  const time = extractTime(data.localtime);
  document.getElementById('time-label').innerText = time;

  const countryISO = countryToISO[data.country];
  if (countryISO) {
    const flagURL = `https://flagcdn.com/${countryISO}.svg`;
    document.getElementById('country-icon').src = flagURL;
  } else {
    console.warn("Missing ISO code for", data.country);

    // document.getElementById('country-label').innerText = data.country;
  }
}

  export const countryToISO = {
  "Afghanistan": "af",
  "Albania": "al",
  "Algeria": "dz",
  "Andorra": "ad",
  "Angola": "ao",
  "Antigua and Barbuda": "ag",
  "Argentina": "ar",
  "Armenia": "am",
  "Australia": "au",
  "Austria": "at",
  "Azerbaijan": "az",
  "Bahamas": "bs",
  "Bahrain": "bh",
  "Bangladesh": "bd",
  "Barbados": "bb",
  "Belarus": "by",
  "Belgium": "be",
  "Belize": "bz",
  "Benin": "bj",
  "Bhutan": "bt",
  "Bolivia": "bo",
  "Bosnia and Herzegovina": "ba",
  "Botswana": "bw",
  "Brazil": "br",
  "Brunei": "bn",
  "Bulgaria": "bg",
  "Burkina Faso": "bf",
  "Burundi": "bi",
  "Cambodia": "kh",
  "Cameroon": "cm",
  "Canada": "ca",
  "Cape Verde": "cv",
  "Central African Republic": "cf",
  "Chad": "td",
  "Chile": "cl",
  "China": "cn",
  "Colombia": "co",
  "Comoros": "km",
  "Costa Rica": "cr",
  "Croatia": "hr",
  "Cuba": "cu",
  "Cyprus": "cy",
  "Czech Republic": "cz",
  "Democratic Republic of the Congo": "cd",
  "Denmark": "dk",
  "Djibouti": "dj",
  "Dominica": "dm",
  "Dominican Republic": "do",
  "Ecuador": "ec",
  "Egypt": "eg",
  "El Salvador": "sv",
  "Equatorial Guinea": "gq",
  "Eritrea": "er",
  "Estonia": "ee",
  "Eswatini": "sz",
  "Ethiopia": "et",
  "Fiji": "fj",
  "Finland": "fi",
  "France": "fr",
  "Gabon": "ga",
  "Gambia": "gm",
  "Georgia": "ge",
  "Germany": "de",
  "Ghana": "gh",
  "Greece": "gr",
  "Grenada": "gd",
  "Guatemala": "gt",
  "Guinea": "gn",
  "Guinea-Bissau": "gw",
  "Guyana": "gy",
  "Haiti": "ht",
  "Honduras": "hn",
  "Hungary": "hu",
  "Iceland": "is",
  "India": "in",
  "Indonesia": "id",
  "Iran": "ir",
  "Iraq": "iq",
  "Ireland": "ie",
  "Israel": "il",
  "Italy": "it",
  "Jamaica": "jm",
  "Japan": "jp",
  "Jordan": "jo",
  "Kazakhstan": "kz",
  "Kenya": "ke",
  "Kiribati": "ki",
  "Kuwait": "kw",
  "Kyrgyzstan": "kg",
  "Laos": "la",
  "Latvia": "lv",
  "Lebanon": "lb",
  "Lesotho": "ls",
  "Liberia": "lr",
  "Libya": "ly",
  "Liechtenstein": "li",
  "Lithuania": "lt",
  "Luxembourg": "lu",
  "Madagascar": "mg",
  "Malawi": "mw",
  "Malaysia": "my",
  "Maldives": "mv",
  "Mali": "ml",
  "Malta": "mt",
  "Marshall Islands": "mh",
  "Mauritania": "mr",
  "Mauritius": "mu",
  "Mexico": "mx",
  "Micronesia": "fm",
  "Moldova": "md",
  "Monaco": "mc",
  "Mongolia": "mn",
  "Montenegro": "me",
  "Morocco": "ma",
  "Mozambique": "mz",
  "Myanmar": "mm",
  "Namibia": "na",
  "Nauru": "nr",
  "Nepal": "np",
  "Netherlands": "nl",
  "New Zealand": "nz",
  "Nicaragua": "ni",
  "Niger": "ne",
  "Nigeria": "ng",
  "North Korea": "kp",
  "North Macedonia": "mk",
  "Norway": "no",
  "Oman": "om",
  "Pakistan": "pk",
  "Palau": "pw",
  "Palestine": "ps",
  "Panama": "pa",
  "Papua New Guinea": "pg",
  "Paraguay": "py",
  "Peru": "pe",
  "Philippines": "ph",
  "Poland": "pl",
  "Portugal": "pt",
  "Qatar": "qa",
  "Republic of the Congo": "cg",
  "Romania": "ro",
  "Russia": "ru",
  "Rwanda": "rw",
  "Saint Kitts and Nevis": "kn",
  "Saint Lucia": "lc",
  "Saint Vincent and the Grenadines": "vc",
  "Samoa": "ws",
  "San Marino": "sm",
  "Sao Tome and Principe": "st",
  "Saudi Arabia": "sa",
  "Senegal": "sn",
  "Serbia": "rs",
  "Seychelles": "sc",
  "Sierra Leone": "sl",
  "Singapore": "sg",
  "Slovakia": "sk",
  "Slovenia": "si",
  "Solomon Islands": "sb",
  "Somalia": "so",
  "South Africa": "za",
  "South Korea": "kr",
  "South Sudan": "ss",
  "Spain": "es",
  "Sri Lanka": "lk",
  "Sudan": "sd",
  "Suriname": "sr",
  "Sweden": "se",
  "Switzerland": "ch",
  "Syria": "sy",
  "Taiwan": "tw",
  "Tajikistan": "tj",
  "Tanzania": "tz",
  "Thailand": "th",
  "Timor-Leste": "tl",
  "Togo": "tg",
  "Tonga": "to",
  "Trinidad and Tobago": "tt",
  "Tunisia": "tn",
  "Turkey": "tr",
  "Turkmenistan": "tm",
  "Tuvalu": "tv",
  "Uganda": "ug",
  "Ukraine": "ua",
  "United Arab Emirates": "ae",
  "United Kingdom": "gb",
  "United States": "us",
  "Uruguay": "uy",
  "Uzbekistan": "uz",
  "Vanuatu": "vu",
  "Vatican City": "va",
  "Venezuela": "ve",
  "Vietnam": "vn",
  "Yemen": "ye",
  "Zambia": "zm",
  "Zimbabwe": "zw"
};

  export const dayIcons = {
    1000: { icon: "Sunny.png", text: "Sunny" },
    1003: { icon: "PartlyCovered.png", text: "Partly Covered" },
    1006: { icon: "Cloudy.png", text: "Cloudy" },
    1009: { icon: "Overcast.png", text: "Overcast" },
    1030: { icon: "Cloudy.png", text: "Cloudy" },
    1063: { icon: "LightRains.png", text: "Light Rains" },
    1066: { icon: "Snowing.png", text: "Snowing" },
    1069: { icon: "LightRains.png", text: "Light Rains" },
    1072: { icon: "Drizzle.png", text: "Drizzle" },
    1087: { icon: "thunderstorm.png", text: "Thunderstorm" },
    1114: { icon: "Snowing.png", text: "Snowing" },
    1117: { icon: "Snowing.png", text: "Snowing" },
    1135: { icon: "Overcast.png", text: "Overcast" },
    1147: { icon: "Overcast.png", text: "Overcast" },
    1150: { icon: "Drizzle.png", text: "Drizzle" },
    1153: { icon: "Drizzle.png", text: "Drizzle" },
    1168: { icon: "Drizzle.png", text: "Drizzle" },
    1171: { icon: "Drizzle.png", text: "Drizzle" },
    1180: { icon: "LightRains.png", text: "Light Rains" },
    1183: { icon: "LightRains.png", text: "Light Rains" },
    1186: { icon: "LightRains.png", text: "Light Rains" },
    1189: { icon: "Rain.png", text: "Rain" },
    1192: { icon: "Rain.png", text: "Rain" },
    1195: { icon: "HeavyRain.png", text: "Heavy Rain" },
    1198: { icon: "Drizzle.png", text: "Drizzle" },
    1201: { icon: "Rain.png", text: "Rain" },
    1204: { icon: "Snowing.png", text: "Snowing" },
    1207: { icon: "Snowing.png", text: "Snowing" },
    1210: { icon: "Snowing.png", text: "Snowing" },
    1213: { icon: "Snowing.png", text: "Snowing" },
    1216: { icon: "Snowing.png", text: "Snowing" },
    1219: { icon: "Snowing.png", text: "Snowing" },
    1222: { icon: "Snowing.png", text: "Snowing" },
    1225: { icon: "Snowing.png", text: "Snowing" },
    1237: { icon: "Hail.png", text: "Hail" },
    1240: { icon: "Rain.png", text: "Rain" },
    1243: { icon: "HeavyRain.png", text: "Heavy Rain" },
    1246: { icon: "HeavyRain.png", text: "Heavy Rain" },
    1249: { icon: "Snowing.png", text: "Snowing" },
    1252: { icon: "Snowing.png", text: "Snowing" },
    1255: { icon: "Snowing.png", text: "Snowing" },
    1258: { icon: "Snowing.png", text: "Snowing" },
    1261: { icon: "Hail.png", text: "Hail" },
    1264: { icon: "HeavyHail.png", text: "Heavy Hail" },
    1273: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" },
    1276: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" },
    1279: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" },
    1282: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" }
  };
  
  export const nightIcons = {
    1000: { icon: "Clear.png", text: "Clear" },
    1003: { icon: "PartlyCoveredNight.png", text: "Partly Covered" },
    1006: { icon: "CloudyNight.png", text: "Cloudy" },
    1009: { icon: "Overcast.png", text: "Overcast" },
    1030: { icon: "CloudyNight.png", text: "Cloudy" },
    1063: { icon: "LightRains.png", text: "Light Rains" },
    1066: { icon: "Snowing.png", text: "Snowing" },
    1069: { icon: "LightRains.png", text: "Light Rains" },
    1072: { icon: "Drizzle.png", text: "Drizzle" },
    1087: { icon: "thunderstorm.png", text: "Thunderstorm" },
    1114: { icon: "Snowing.png", text: "Snowing" },
    1117: { icon: "Snowing.png", text: "Snowing" },
    1135: { icon: "Overcast.png", text: "Overcast" },
    1147: { icon: "Overcast.png", text: "Overcast" },
    1150: { icon: "Drizzle.png", text: "Drizzle" },
    1153: { icon: "Drizzle.png", text: "Drizzle" },
    1168: { icon: "Drizzle.png", text: "Drizzle" },
    1171: { icon: "Drizzle.png", text: "Drizzle" },
    1180: { icon: "LightRains.png", text: "Light Rains" },
    1183: { icon: "LightRains.png", text: "Light Rains" },
    1186: { icon: "LightRains.png", text: "Light Rains" },
    1189: { icon: "Rain.png", text: "Rain" },
    1192: { icon: "Rain.png", text: "Rain" },
    1195: { icon: "HeavyRain.png", text: "Heavy Rain" },
    1198: { icon: "Drizzle.png", text: "Drizzle" },
    1201: { icon: "Rain.png", text: "Rain" },
    1204: { icon: "Snowing.png", text: "Snowing" },
    1207: { icon: "Snowing.png", text: "Snowing" },
    1210: { icon: "Snowing.png", text: "Snowing" },
    1213: { icon: "Snowing.png", text: "Snowing" },
    1216: { icon: "Snowing.png", text: "Snowing" },
    1219: { icon: "Snowing.png", text: "Snowing" },
    1222: { icon: "Snowing.png", text: "Snowing" },
    1225: { icon: "Snowing.png", text: "Snowing" },
    1237: { icon: "Hail.png", text: "Hail" },
    1240: { icon: "Rain.png", text: "Rain" },
    1243: { icon: "HeavyRain.png", text: "Heavy Rain" },
    1246: { icon: "HeavyRain.png", text: "Heavy Rain" },
    1249: { icon: "Snowing.png", text: "Snowing" },
    1252: { icon: "Snowing.png", text: "Snowing" },
    1255: { icon: "Snowing.png", text: "Snowing" },
    1258: { icon: "Snowing.png", text: "Snowing" },
    1261: { icon: "Hail.png", text: "Hail" },
    1264: { icon: "HeavyHail.png", text: "Heavy Hail" },
    1273: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" },
    1276: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" },
    1279: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" },
    1282: { icon: "HeavyThunderstorm.png", text: "Heavy Thunderstorm" }
  };
  export const seasonIcons = {
  "Winter": "Assets/SeasonIcons/Winter.svg",
  "Spring": "Assets/SeasonIcons/Spring.svg",
  "Summer": "Assets/SeasonIcons/Summer.svg",
  "Autumn": "Assets/SeasonIcons/Autumn.svg"
};
  