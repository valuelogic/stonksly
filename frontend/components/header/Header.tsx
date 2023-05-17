import React from "react";
import {Web3Button} from "@web3modal/react";

export const Header = () => (
    <ul className="flex">
        <li className="flex-1 mr-2">
            <Web3Button />
        </li>
    </ul>
)