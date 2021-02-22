import { ethers } from "ethers";
import deploy from "./deploy";
import addContract from "./addContract";
import "./scss/index.scss";
import { resolveProperties } from "ethers/lib/utils";

const server = "http://localhost:3042";
let transactionNumber = 0;

// async function to get all the existing contracts from the server
async function getContracts() {
  let response = await fetch(`${server}/contract`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return await response.json();
  }
}


// async functon to store a new contract on the server



// create a new contract
async function newContract() {

  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  // const value = ethers.BigNumber.from(document.getElementById("wei").value);
  const value = ethers.utils.parseEther(document.getElementById("wei").value);
  const humanEth = ethers.utils.formatEther(value)

  // send the data to the server
  transactionNumber++
  const body = JSON.stringify({
    transactionNumber, beneficiary, arbiter, humanEth
  })
  console.log(body)
  const request = await new Request(`${server}/send`, { method: 'POST', body })

  let response = await fetch((request, { headers: { 'Content-Type': 'application/json' }}))
  console.log(await response.json())

  return await response.json()

  const contract = await deploy(arbiter, beneficiary, value);
  addContract(++contracts, contract, arbiter, beneficiary, value);
}

// on pageload get all the contracts from the server
getContracts().then((data) => {
  console.log(data);
});

// on click create a new contract
document.getElementById("deploy").addEventListener("click", newContract);
