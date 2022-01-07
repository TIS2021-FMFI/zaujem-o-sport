import React from 'react';
import {useState} from "react";
import {useQuery} from "react-query";
import {Spinner} from "react-bootstrap";
import { CSVLink, CSVDownload } from "react-csv";

const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
<Link data={csvData}>Download me</Link>;
<Download data={csvData} target="_blank" />;






