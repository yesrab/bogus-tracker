import "./App.css";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import axios from "axios";
function App() {
  const [loan, setLoan] = useState(10); // loan percentage
  const [salary, setSalary] = useState(400000); // salary
  const [savingsData, setSavingsData] = useState({
    USD: [],
    CAD: [],
    EUR: [],
    AUD: [],
  });
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [bar, setBar] = useState(null);
  useEffect(() => {
    generateSavingsData();
  }, [loan, salary]);

  async function fetchExchangeRates() {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      return response.data.rates;
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
    }
  }

  function formatMoney(amount) {
    let parts = amount.toString().split(".");
    let integerPart = parts[0];
    let fractionalPart =
      parts.length > 1 ? "." + parts[1].padEnd(2, "0") : ".00";
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + integerPart + fractionalPart;
  }

  async function calculateSavingsPerCountry(salary, loanPercentage, years) {
    const exchangeRates = await fetchExchangeRates();
    const monthlySalary = salary / 12;
    let savingsAmmount = 0;
    let savings = {
      USD: [],
      CAD: [],
      EUR: [],
      AUD: [],
    };

    for (let i = 0; i < years; i++) {
      const loanAmount = (monthlySalary * loanPercentage) / 100;
      const monthlySavings = monthlySalary - loanAmount;

      savingsAmmount += monthlySavings * 12;

      savings.USD.push(savingsAmmount);
      savings.CAD.push(savingsAmmount * exchangeRates.CAD);
      savings.EUR.push(savingsAmmount * exchangeRates.EUR);
      savings.AUD.push(savingsAmmount * exchangeRates.AUD);
    }

    return savings;
  }

  async function generateSavingsData() {
    const savings = await calculateSavingsPerCountry(salary, loan, 10); // Calculate savings for 10 years
    setSavingsData(savings);
  }

  let options = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            return formatMoney(value);
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return formatMoney(context.parsed.y);
          },
        },
      },
    },
  };
  let data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      ...(selectedCountry === "ALL" || selectedCountry === "USD"
        ? [
            {
              label: "Savings USD",
              data: savingsData.USD,
              borderWidth: 1,
              tension: 0.1,
            },
          ]
        : []),
      ...(selectedCountry === "ALL" || selectedCountry === "EUR"
        ? [
            {
              label: "Savings EUR",
              data: savingsData.EUR,
              borderWidth: 1,
              tension: 0.1,
            },
          ]
        : []),
      ...(selectedCountry === "ALL" || selectedCountry === "CAD"
        ? [
            {
              label: "Savings CAD",
              data: savingsData.CAD,
              tension: 0.1,
              borderWidth: 1,
            },
          ]
        : []),
      ...(selectedCountry === "ALL" || selectedCountry === "AUD"
        ? [
            {
              label: "Savings AUD",
              data: savingsData.AUD,
              borderWidth: 1,
              tension: 0.1,
            },
          ]
        : []),
    ],
  };
  useEffect(() => {
    data = {
      labels: Array.from({ length: 10 }, (_, i) => i + 1),
      datasets: [
        ...(selectedCountry === "ALL" || selectedCountry === "USD"
          ? [
              {
                label: "Savings USD",
                data: savingsData.USD,
                borderWidth: 1,
                tension: 0.1,
              },
            ]
          : []),
        ...(selectedCountry === "ALL" || selectedCountry === "EUR"
          ? [
              {
                label: "Savings EUR",
                data: savingsData.EUR,
                borderWidth: 1,
                tension: 0.1,
              },
            ]
          : []),
        ...(selectedCountry === "ALL" || selectedCountry === "CAD"
          ? [
              {
                label: "Savings CAD",
                data: savingsData.CAD,
                tension: 0.1,
                borderWidth: 1,
              },
            ]
          : []),
        ...(selectedCountry === "ALL" || selectedCountry === "AUD"
          ? [
              {
                label: "Savings AUD",
                data: savingsData.AUD,
                borderWidth: 1,
                tension: 0.1,
              },
            ]
          : []),
      ],
    };
    options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
              return formatMoney(value);
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return formatMoney(context.parsed.y);
            },
          },
        },
      },
    };
  }, [savingsData]);

  useEffect(() => {
    const getBarData = async () => {
      try {
        const data = await axios.get("/api/v1/data/getData");
        setBar(data.data);
        console.log(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getBarData();
  }, []);

  return (
    <main className='App'>
      <h1>Earnings Calculator</h1>
      <div className='sliderContainers'>
        <span className='inputcontainers'>
          <h3>Loan %: {loan}%</h3>
          <input
            type='range'
            value={loan}
            onChange={(e) => {
              setLoan(e.target.value);
            }}
          />
        </span>
        <span className='inputcontainers'>
          <h3>Salary: {formatMoney(salary)} USD</h3>
          <input
            type='range'
            value={salary}
            min={100000}
            max={4000000}
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
        </span>
        <span className='inputcontainers'>
          <h3>Target Country</h3>
          <select
            name='Country'
            id='Country'
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value='ALL'>ALL</option>
            <option value='USD'>US</option>
            <option value='CAD'>CA</option>
            <option value='AUD'>AU</option>
            <option value='EUR'>EUR</option>
          </select>
        </span>
      </div>
      <div className='lineGraphBox'>
        <div className='graph'>
          <Line options={options} data={data} />
        </div>
        <div className='graph'>
          <Bar
            options={options}
            data={
              bar
                ? bar
                : {
                    labels: "loading",
                    datasets: [{ label: "Loading", data: [69] }],
                  }
            }
          />
        </div>
      </div>
    </main>
  );
}

export default App;

