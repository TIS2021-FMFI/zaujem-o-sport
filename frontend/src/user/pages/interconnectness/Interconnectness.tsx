import {useState} from "react";
import {useQuery} from "react-query";
import {Spinner} from "react-bootstrap";
// npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'



export const Interconnectness = () => {
    const locations = [
        {
            title: "Afghanistan",
            code:  "AFG",
            coordinates: [33, 65],
        },
        {
            title: "Albania",
            code:  "ALB",
            coordinates: [41, 20],
        },
        {
            title: "Algeria",
            code:  "DZA",
            coordinates: [28, 3],
        },
        {
            title: "American Samoa",
            code:  "ASM",
            coordinates: [-14.3333, -170],
        },
        {
            title: "Andorra",
            code:  "AND",
            coordinates: [42.5, 1.6],
        },
        {
            title: "Angola",
            code:  "AGO",
            coordinates: [-12.5, 18.5],
        },
        {
            title: "Anguilla",
            code:  "AIA",
            coordinates: [18.25, -63.1667],
        },
        {
            title: "Antarctica",
            code:  "ATA",
            coordinates: [-90, 0],
        },
        {
            title: "Antigua and Barbuda",
            code:  "ATG",
            coordinates: [17.05, -61.8],
        },
        {
            title: "Argentina",
            code:  "ARG",
            coordinates: [-34, -64],
        },
        {
            title: "Armenia",
            code:  "ARM",
            coordinates: [40, 45],
        },
        {
            title: "Aruba",
            code:  "ABW",
            coordinates: [12.5, -69.9667],
        },
        {
            title: "Australia",
            code:  "AUS",
            coordinates: [-27, 133],
        },
        {
            title: "Austria",
            code:  "AUT",
            coordinates: [47.3333, 13.3333],
        },
        {
            title: "Azerbaijan",
            code:  "AZE",
            coordinates: [40.5, 47.5],
        },
        {
            title: "Bahamas",
            code:  "BHS",
            coordinates: [24.25, -76],
        },
        {
            title: "Bahrain",
            code:  "BHR",
            coordinates: [26, 50.55],
        },
        {
            title: "Bangladesh",
            code:  "BGD",
            coordinates: [24, 90],
        },
        {
            title: "Barbados",
            code:  "BRB",
            coordinates: [13.1667, -59.5333],
        },
        {
            title: "Belarus",
            code:  "BLR",
            coordinates: [53, 28],
        },
        {
            title: "Belgium",
            code:  "BEL",
            coordinates: [50.8333, 4],
        },
        {
            title: "Belize",
            code:  "BLZ",
            coordinates: [17.25, -88.75],
        },
        {
            title: "Benin",
            code:  "BEN",
            coordinates: [9.5, 2.25],
        },
        {
            title: "Bermuda",
            code:  "BMU",
            coordinates: [32.3333, -64.75],
        },
        {
            title: "Bhutan",
            code:  "BTN",
            coordinates: [27.5, 90.5],
        },
        {
            title: "Bolivia",
            code:  "BOL",
            coordinates: [-17, -65],
        },
        {
            title: "Bosnia and Herzegovina",
            code:  "BIH",
            coordinates: [44, 18],
        },
        {
            title: "Botswana",
            code:  "BWA",
            coordinates: [-22, 24],
        },
        {
            title: "Bouvet Island",
            code:  "BVT",
            coordinates: [-54.4333, 3.4],
        },
        {
            title: "Brazil",
            code:  "BRA",
            coordinates: [-10, -55],
        },
        {
            title: "British Indian Ocean Territory",
            code:  "IOT",
            coordinates: [-6, 71.5],
        },
        {
            title: "Brunei Darussalam",
            code:  "BRN",
            coordinates: [4.5, 114.6667],
        },
        {
            title: "Brunei",
            code:  "BRN",
            coordinates: [4.5, 114.6667],
        },
        {
            title: "Bulgaria",
            code:  "BGR",
            coordinates: [43, 25],
        },
        {
            title: "Burkina Faso",
            code:  "BFA",
            coordinates: [13, -2],
        },
        {
            title: "Burundi",
            code:  "BDI",
            coordinates: [-3.5, 30],
        },
        {
            title: "Cambodia",
            code:  "KHM",
            coordinates: [13, 105],
        },
        {
            title: "Cameroon",
            code:  "CMR",
            coordinates: [6, 12],
        },
        {
            title: "Canada",
            code:  "CAN",
            coordinates: [60, -95],
        },
        {
            title: "Cape Verde",
            code:  "CPV",
            coordinates: [16, -24],
        },
        {
            title: "Cayman Islands",
            code:  "CYM",
            coordinates: [19.5, -80.5],
        },
        {
            title: "Central African Republic",
            code:  "CAF",
            coordinates: [7, 21],
        },
        {
            title: "Chad",
            code:  "TCD",
            coordinates: [15, 19],
        },
        {
            title: "Chile",
            code:  "CHL",
            coordinates: [-30, -71],
        },
        {
            title: "China",
            code:  "CHN",
            coordinates: [35, 105],
        },
        {
            title: "Christmas Island",
            code:  "CXR",
            coordinates: [-10.5, 105.6667],
        },
        {
            title: "Cocos (Keeling) Islands",
            code:  "CCK",
            coordinates: [-12.5, 96.8333],
        },
        {
            title: "Colombia",
            code:  "COL",
            coordinates: [4, -72],
        },
        {
            title: "Comoros",
            code:  "COM",
            coordinates: [-12.1667, 44.25],
        },
        {
            title: "Congo",
            code:  "COG",
            coordinates: [-0.228,15.828],
        },
        {
            title: "Cook Islands",
            code:  "COK",
            coordinates: [-21.2333, -159.7667],
        },
        {
            title: "Costa Rica",
            code:  "CRI",
            coordinates: [10, -84],
        },
        {
            title: "CĂ´te d'Ivoire",
            code:  "CIV",
            coordinates: [8, -5],
        },
        {
            title: "Ivory Coast",
            code:  "CIV",
            coordinates: [8, -5],
        },
        {
            title: "Croatia",
            code:  "HRV",
            coordinates: [45.1667, 15.5],
        },
        {
            title: "Cuba",
            code:  "CUB",
            coordinates: [21.5, -80],
        },
        {
            title: "Cyprus",
            code:  "CYP",
            coordinates: [35, 33],
        },
        {
            title: "Czech Republic",
            code:  "CZE",
            coordinates: [49.75, 15.5],
        },
        {
            title: "Denmark",
            code:  "DNK",
            coordinates: [56, 10],
        },
        {
            title: "Djibouti",
            code:  "DJI",
            coordinates: [11.5, 43],
        },
        {
            title: "Dominica",
            code:  "DMA",
            coordinates: [15.4167, -61.3333],
        },
        {
            title: "Dominican Republic",
            code:  "DOM",
            coordinates: [19, -70.6667],
        },
        {
            title: "Ecuador",
            code:  "ECU",
            coordinates: [-2, -77.5],
        },
        {
            title: "Egypt",
            code:  "EGY",
            coordinates: [27, 30],
        },
        {
            title: "El Salvador",
            code:  "SLV",
            coordinates: [13.8333, -88.9167],
        },
        {
            title: "Equatorial Guinea",
            code:  "GNQ",
            coordinates: [2, 10],
        },
        {
            title: "Eritrea",
            code:  "ERI",
            coordinates: [15, 39],
        },
        {
            title: "Estonia",
            code:  "EST",
            coordinates: [59, 26],
        },
        {
            title: "Ethiopia",
            code:  "ETH",
            coordinates: [8, 38],
        },
        {
            title: "Falkland Islands (Malvinas)",
            code:  "FLK",
            coordinates: [-51.75, -59],
        },
        {
            title: "Faroe Islands",
            code:  "FRO",
            coordinates: [62, -7],
        },
        {
            title: "Fiji",
            code:  "FJI",
            coordinates: [-18, 175],
        },
        {
            title: "Finland",
            code:  "FIN",
            coordinates: [64, 26],
        },
        {
            title: "France",
            code:  "FRA",
            coordinates: [46, 2],
        },
        {
            title: "French Guiana",
            code:  "GUF",
            coordinates: [4, -53],
        },
        {
            title: "French Polynesia",
            code:  "PYF",
            coordinates: [-15, -140],
        },
        {
            title: "French Southern Territories",
            code:  "ATF",
            coordinates: [-43, 67],
        },
        {
            title: "Gabon",
            code:  "GAB",
            coordinates: [-1, 11.75],
        },
        {
            title: "Gambia",
            code:  "GMB",
            coordinates: [13.4667, -16.5667],
        },
        {
            title: "Georgia",
            code:  "GEO",
            coordinates: [42, 43.5],
        },
        {
            title: "Germany",
            code:  "DEU",
            coordinates: [51, 9],
        },
        {
            title: "Ghana",
            code:  "GHA",
            coordinates: [8, -2],
        },
        {
            title: "Gibraltar",
            code:  "GIB",
            coordinates: [36.1833, -5.3667],
        },
        {
            title: "Greece",
            code:  "GRC",
            coordinates: [39, 22],
        },
        {
            title: "Greenland",
            code:  "GRL",
            coordinates: [72, -40],
        },
        {
            title: "Grenada",
            code:  "GRD",
            coordinates: [12.1167, -61.6667],
        },
        {
            title: "Guadeloupe",
            code:  "GLP",
            coordinates: [16.25, -61.5833],
        },
        {
            title: "Guam",
            code:  "GUM",
            coordinates: [13.4667, 144.7833],
        },
        {
            title: "Guatemala",
            code:  "GTM",
            coordinates: [15.5, -90.25],
        },
        {
            title: "Guernsey",
            code:  "GGY",
            coordinates: [49.5, -2.56],
        },
        {
            title: "Guinea",
            code:  "GIN",
            coordinates: [11, -10],
        },
        {
            title: "Guinea-Bissau",
            code:  "GNB",
            coordinates: [12, -15],
        },
        {
            title: "Guyana",
            code:  "GUY",
            coordinates: [5, -59],
        },
        {
            title: "Haiti",
            code:  "HTI",
            coordinates: [19, -72.4167],
        },
        {
            title: "Heard Island and McDonald Islands",
            code:  "HMD",
            coordinates: [-53.1, 72.5167],
        },
        {
            title: "Holy See (Vatican City State)",
            code:  "VAT",
            coordinates: [41.9, 12.45],
        },
        {
            title: "Honduras",
            code:  "HND",
            coordinates: [15, -86.5],
        },
        {
            title: "Hong Kong",
            code:  "HKG",
            coordinates: [22.25, 114.1667],
        },
        {
            title: "Hungary",
            code:  "HUN",
            coordinates: [47, 20],
        },
        {
            title: "Iceland",
            code:  "ISL",
            coordinates: [65, -18],
        },
        {
            title: "India",
            code:  "IND",
            coordinates: [20, 77],
        },
        {
            title: "Indonesia",
            code:  "IDN",
            coordinates: [-5, 120],
        },
        {
            title: "Iran",
            code:  "IRN",
            coordinates: [32.43,53.7],
        },
        {
            title: "Iraq",
            code:  "IRQ",
            coordinates: [33, 44],
        },
        {
            title: "Ireland",
            code:  "IRL",
            coordinates: [53, -8],
        },
        {
            title: "Isle of Man",
            code:  "IMN",
            coordinates: [54.23, -4.55],
        },
        {
            title: "Israel",
            code:  "ISR",
            coordinates: [31.5, 34.75],
        },
        {
            title: "Italy",
            code:  "ITA",
            coordinates: [42.8333, 12.8333],
        },
        {
            title: "Jamaica",
            code:  "JAM",
            coordinates: [18.25, -77.5],
        },
        {
            title: "Japan",
            code:  "JPN",
            coordinates: [36, 138],
        },
        {
            title: "Jersey",
            code:  "JEY",
            coordinates: [49.21, -2.13],
        },
        {
            title: "Jordan",
            code:  "JOR",
            coordinates: [31, 36],
        },
        {
            title: "Kazakhstan",
            code:  "KAZ",
            coordinates: [48, 68],
        },
        {
            title: "Kenya",
            code:  "KEN",
            coordinates: [1, 38],
        },
        {
            title: "Kiribati",
            code:  "KIR",
            coordinates: [1.4167, 173],
        },
        {
            title: "Korea",
            code:  "PRK",
            coordinates: [40, 127],
        },
        {
            title: "South Korea",
            code:  "KOR",
            coordinates: [37, 127.5],
        },
        {
            title: "Kuwait",
            code:  "KWT",
            coordinates: [29.3375, 47.6581],
        },
        {
            title: "Kyrgyzstan",
            code:  "KGZ",
            coordinates: [41, 75],
        },
        {
            title: "Lao People's Democratic Republic",
            code:  "LAO",
            coordinates: [18, 105],
        },
        {
            title: "Latvia",
            code:  "LVA",
            coordinates: [57, 25],
        },
        {
            title: "Lebanon",
            code:  "LBN",
            coordinates: [33.8333, 35.8333],
        },
        {
            title: "Lesotho",
            code:  "LSO",
            coordinates: [-29.5, 28.5],
        },
        {
            title: "Liberia",
            code:  "LBR",
            coordinates: [6.5, -9.5],
        },
        {
            title: "Libyan Arab Jamahiriya",
            code:  "LBY",
            coordinates: [25, 17],
        },
        {
            title: "Libya",
            code:  "LBY",
            coordinates: [25, 17],
        },
        {
            title: "Liechtenstein",
            code:  "LIE",
            coordinates: [47.1667, 9.5333],
        },
        {
            title: "Lithuania",
            code:  "LTU",
            coordinates: [56, 24],
        },
        {
            title: "Luxembourg",
            code:  "LUX",
            coordinates: [49.75, 6.1667],
        },
        {
            title: "Macao",
            code:  "MAC",
            coordinates: [22.1667, 113.55],
        },
        {
            title: "Macedonia",
            code:  "MKD",
            coordinates: [42, 22],
        },
        {
            title: "Madagascar",
            code:  "MDG",
            coordinates: [-20, 47],
        },
        {
            title: "Malawi",
            code:  "MWI",
            coordinates: [-13.5, 34],
        },
        {
            title: "Malaysia",
            code:  "MYS",
            coordinates: [2.5, 112.5],
        },
        {
            title: "Maldives",
            code:  "MDV",
            coordinates: [3.25, 73],
        },
        {
            title: "Mali",
            code:  "MLI",
            coordinates: [17, -4],
        },
        {
            title: "Malta",
            code:  "MLT",
            coordinates: [35.8333, 14.5833],
        },
        {
            title: "Marshall Islands",
            code:  "MHL",
            coordinates: [9, 168],
        },
        {
            title: "Martinique",
            code:  "MTQ",
            coordinates: [14.6667, -61],
        },
        {
            title: "Mauritania",
            code:  "MRT",
            coordinates: [20, -12],
        },
        {
            title: "Mauritius",
            code:  "MUS",
            coordinates: [-20.2833, 57.55],
        },
        {
            title: "Mayotte",
            code:  "MYT",
            coordinates: [-12.8333, 45.1667],
        },
        {
            title: "Mexico",
            code:  "MEX",
            coordinates: [23, -102],
        },
        {
            title: "Micronesia",
            code:  "FSM",
            coordinates: [7.45,150.5],
        },
        {
            title: "Moldova",
            code:  "MDA",
            coordinates: [47.42,28.37],
        },
        {
            title: "Monaco",
            code:  "MCO",
            coordinates: [43.7333, 7.4],
        },
        {
            title: "Mongolia",
            code:  "MNG",
            coordinates: [46, 105],
        },
        {
            title: "Montenegro",
            code:  "MNE",
            coordinates: [42, 19],
        },
        {
            title: "Montserrat",
            code:  "MSR",
            coordinates: [16.75, -62.2],
        },
        {
            title: "Morocco",
            code:  "MAR",
            coordinates: [32, -5],
        },
        {
            title: "Mozambique",
            code:  "MOZ",
            coordinates: [-18.25, 35],
        },
        {
            title: "Myanmar",
            code:  "MMR",
            coordinates: [22, 98],
        },
        {
            title: "Burma",
            code:  "MMR",
            coordinates: [22, 98],
        },
        {
            title: "Namibia",
            code:  "NAM",
            coordinates: [-22, 17],
        },
        {
            title: "Nauru",
            code:  "NRU",
            coordinates: [-0.5333, 166.9167],
        },
        {
            title: "Nepal",
            code:  "NPL",
            coordinates: [28, 84],
        },
        {
            title: "Netherlands",
            code:  "NLD",
            coordinates: [52.5, 5.75],
        },
        {
            title: "Netherlands Antilles",
            code:  "ANT",
            coordinates: [12.25, -68.75],
        },
        {
            title: "New Caledonia",
            code:  "NCL",
            coordinates: [-21.5, 165.5],
        },
        {
            title: "New Zealand",
            code:  "NZL",
            coordinates: [-41, 174],
        },
        {
            title: "Nicaragua",
            code:  "NIC",
            coordinates: [13, -85],
        },
        {
            title: "Niger",
            code:  "NER",
            coordinates: [16, 8],
        },
        {
            title: "Nigeria",
            code:  "NGA",
            coordinates: [10, 8],
        },
        {
            title: "Niue",
            code:  "NIU",
            coordinates: [-19.0333, -169.8667],
        },
        {
            title: "Norfolk Island",
            code:  "NFK",
            coordinates: [-29.0333, 167.95],
        },
        {
            title: "Northern Mariana Islands",
            code:  "MNP",
            coordinates: [15.2, 145.75],
        },
        {
            title: "Norway",
            code:  "NOR",
            coordinates: [62, 10],
        },
        {
            title: "Oman",
            code:  "OMN",
            coordinates: [21, 57],
        },
        {
            title: "Pakistan",
            code:  "PAK",
            coordinates: [30, 70],
        },
        {
            title: "Palau",
            code:  "PLW",
            coordinates: [7.5, 134.5],
        },
        {
            title: "Palestinian Territory",
            code:  "PS",
            coordinates: [32,35],
        },
        {
            title: "Panama",
            code:  "PAN",
            coordinates: [9, -80],
        },
        {
            title: "Papua New Guinea",
            code:  "PNG",
            coordinates: [-6, 147],
        },
        {
            title: "Paraguay",
            code:  "PRY",
            coordinates: [-23, -58],
        },
        {
            title: "Peru",
            code:  "PER",
            coordinates: [-10, -76],
        },
        {
            title: "Philippines",
            code:  "PHL",
            coordinates: [13, 122],
        },
        {
            title: "Pitcairn",
            code:  "PCN",
            coordinates: [-24.7, -127.4],
        },
        {
            title: "Poland",
            code:  "POL",
            coordinates: [52, 20],
        },
        {
            title: "Portugal",
            code:  "PRT",
            coordinates: [39.5, -8],
        },
        {
            title: "Puerto Rico",
            code:  "PRI",
            coordinates: [18.25, -66.5],
        },
        {
            title: "Qatar",
            code:  "QAT",
            coordinates: [25.5, 51.25],
        },
        {
            title: "RĂ©union",
            code:  "REU",
            coordinates: [-21.1, 55.6],
        },
        {
            title: "Romania",
            code:  "ROU",
            coordinates: [46, 25],
        },
        {
            title: "Russian Federation",
            code:  "RUS",
            coordinates: [60, 100],
        },
        {
            title: "Russia",
            code:  "RUS",
            coordinates: [60, 100],
        },
        {
            title: "Rwanda",
            code:  "RWA",
            coordinates: [-2, 30],
        },
        {
            title: "Saint Helena",
            code:  "SHN",
            coordinates: [-24.14,-10.03],
        },
        {
            title: "Saint Kitts and Nevis",
            code:  "KNA",
            coordinates: [17.3333, -62.75],
        },
        {
            title: "Saint Lucia",
            code:  "LCA",
            coordinates: [13.8833, -61.1333],
        },
        {
            title: "Saint Pierre and Miquelon",
            code:  "SPM",
            coordinates: [46.8333, -56.3333],
        },
        {
            title: "Saint Vincent and the Grenadines",
            code:  "VCT",
            coordinates: [13.25, -61.2],
        },
        {
            title: "Saint Vincent & the Grenadines",
            code:  "VCT",
            coordinates: [13.25, -61.2],
        },
        {
            title: "St. Vincent and the Grenadines",
            code:  "VCT",
            coordinates: [13.25, -61.2],
        },
        {
            title: "Samoa",
            code:  "WSM",
            coordinates: [-13.5833, -172.3333],
        },
        {
            title: "San Marino",
            code:  "SMR",
            coordinates: [43.7667, 12.4167],
        },
        {
            title: "Sao Tome and Principe",
            code:  "STP",
            coordinates: [1, 7],
        },
        {
            title: "Saudi Arabia",
            code:  "SAU",
            coordinates: [25, 45],
        },
        {
            title: "Senegal",
            code:  "SEN",
            coordinates: [14, -14],
        },
        {
            title: "Serbia",
            code:  "SRB",
            coordinates: [44, 21],
        },
        {
            title: "Seychelles",
            code:  "SYC",
            coordinates: [-4.5833, 55.6667],
        },
        {
            title: "Sierra Leone",
            code:  "SLE",
            coordinates: [8.5, -11.5],
        },
        {
            title: "Singapore",
            code:  "SGP",
            coordinates: [1.3667, 103.8],
        },
        {
            title: "Slovakia",
            code:  "SVK",
            coordinates: [48.6667, 19.5],
        },
        {
            title: "Slovenia",
            code:  "SVN",
            coordinates: [46, 15],
        },
        {
            title: "Solomon Islands",
            code:  "SLB",
            coordinates: [-8, 159],
        },
        {
            title: "Somalia",
            code:  "SOM",
            coordinates: [10, 49],
        },
        {
            title: "South Africa",
            code:  "ZAF",
            coordinates: [-29, 24],
        },
        {
            title: "South Georgia and the South Sandwich Islands",
            code:  "SGS",
            coordinates: [-54.5, -37],
        },
        {
            title: "South Sudan",
            code:  "SSD",
            coordinates: [8, 30],
        },
        {
            title: "Spain",
            code:  "ESP",
            coordinates: [40, -4],
        },
        {
            title: "Sri Lanka",
            code:  "LKA",
            coordinates: [7, 81],
        },
        {
            title: "Sudan",
            code:  "SDN",
            coordinates: [15, 30],
        },
        {
            title: "Suriname",
            code:  "SUR",
            coordinates: [4, -56],
        },
        {
            title: "Svalbard and Jan Mayen",
            code:  "SJM",
            coordinates: [78, 20],
        },
        {
            title: "Swaziland",
            code:  "SWZ",
            coordinates: [-26.5, 31.5],
        },
        {
            title: "Sweden",
            code:  "SWE",
            coordinates: [62, 15],
        },
        {
            title: "Switzerland",
            code:  "CHE",
            coordinates: [47, 8],
        },
        {
            title: "Syrian Arab Republic",
            code:  "SYR",
            coordinates: [35, 38],
        },
        {
            title: "Taiwan",
            code:  "TWN",
            coordinates: [23.7,120],
        },
        {
            title: "Tajikistan",
            code:  "TJK",
            coordinates: [39, 71],
        },
        {
            title: "Tanzania",
            code:  "TZA",
            coordinates: [-6.37,34.89],
        },
        {
            title: "Thailand",
            code:  "THA",
            coordinates: [15, 100],
        },
        {
            title: "Timor-Leste",
            code:  "TLS",
            coordinates: [-8.55, 125.5167],
        },
        {
            title: "Togo",
            code:  "TGO",
            coordinates: [8, 1.1667],
        },
        {
            title: "Tokelau",
            code:  "TKL",
            coordinates: [-9, -172],
        },
        {
            title: "Tonga",
            code:  "TON",
            coordinates: [-20, -175],
        },
        {
            title: "Trinidad and Tobago",
            code:  "TTO",
            coordinates: [11, -61],
        },
        {
            title: "Tunisia",
            code:  "TUN",
            coordinates: [34, 9],
        },
        {
            title: "Turkey",
            code:  "TUR",
            coordinates: [39, 35],
        },
        {
            title: "Turkmenistan",
            code:  "TKM",
            coordinates: [40, 60],
        },
        {
            title: "Turks and Caicos Islands",
            code:  "TCA",
            coordinates: [21.75, -71.5833],
        },
        {
            title: "Tuvalu",
            code:  "TUV",
            coordinates: [-8, 178],
        },
        {
            title: "Uganda",
            code:  "UGA",
            coordinates: [1, 32],
        },
        {
            title: "Ukraine",
            code:  "UKR",
            coordinates: [49, 32],
        },
        {
            title: "United Arab Emirates",
            code:  "ARE",
            coordinates: [24, 54],
        },
        {
            title: "United Kingdom",
            code:  "GBR",
            coordinates: [54, -2],
        },
        {
            title: "United States",
            code:  "USA",
            coordinates: [38, -97],
        },
        {
            title: "United States Minor Outlying Islands",
            code:  "UMI",
            coordinates: [19.2833, 166.6],
        },
        {
            title: "Uruguay",
            code:  "URY",
            coordinates: [-33, -56],
        },
        {
            title: "Uzbekistan",
            code:  "UZB",
            coordinates: [41, 64],
        },
        {
            title: "Vanuatu",
            code:  "VUT",
            coordinates: [-16, 167],
        },
        {
            title: "Venezuela",
            code:  "VEN",
            coordinates: [8, -66],
        },
        {
            title: "Viet Nam",
            code:  "VNM",
            coordinates: [16, 106],
        },
        {
            title: "Vietnam",
            code:  "VNM",
            coordinates: [16, 106],
        },
        {
            title: "Virgin Islands",
            code:  "VGB",
            coordinates: [18.4,-64.6],
        },
        {
            title: "Virgin Islands",
            code:  "VIR",
            coordinates: [18.35,-64.9],
        },
        {
            title: "Wallis and Futuna",
            code:  "WLF",
            coordinates: [-13.3, -176.2],
        },
        {
            title: "Western Sahara",
            code:  "ESH",
            coordinates: [24.5, -13],
        },
        {
            title: "Yemen",
            code:  "YEM",
            coordinates: [15, 48],
        },
        {
            title: "Zambia",
            code:  "ZMB",
            coordinates: [-15, 30],
        },
        {
            title: "Zimbabwe",
            code:  "ZWE",
            coordinates: [-20, 30],
        },
    ];




    return (<>
        <header>
            <h1>Prepojenie</h1>
        </header>
        <div>

        <MapContainer style = {{height:"600px"}} center={[48, 17]} zoom={7} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {locations.map((item) => (
                <Marker position={[item.coordinates[0],item.coordinates[1]]}>
                    <Popup>
                        <h1>{item.title}</h1>
                        <p>{item.code}</p>
                    </Popup>
                </Marker>
            ))}


        </MapContainer>

        </div>

    </>)
}