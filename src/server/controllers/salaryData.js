import rangeSchema from "../model/salarySchema.js";

const dataToInsert = [
  {
    group: "salary",
    value: 102109.6984,
    rank_range: "1-50",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 87238,
    rank_range: "1-50",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 65911.253674667038,
    nation: "Canada",
    rank_range: "1-50",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 70038.916195293059,
    rank_range: "1-50",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 79021.959932837257,
    rank_range: "1-50",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 16731.449200907711,
    rank_range: "1-50",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 72014.312745973511,
    rank_range: "1-50",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 66807.114529027764,
    rank_range: "1-50",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 85260.2766,
    rank_range: "51-100",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 83940,
    rank_range: "51-100",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 55034.95702257109,
    rank_range: "51-100",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 30413.558598373602,
    rank_range: "51-100",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 65983.02342187485,
    rank_range: "51-100",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 12547.240630226896,
    rank_range: "51-100",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 60131.03904358174,
    rank_range: "51-100",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 59306.22187990256,
    rank_range: "51-100",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 84880.67,
    rank_range: "101-250",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 78614,
    rank_range: "101-250",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 54789.97960975602,
    rank_range: "101-250",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 29047.141746922636,
    rank_range: "101-250",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 65689.7494967641,
    rank_range: "101-250",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 10136.8780095876,
    rank_range: "101-250",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 59863.915525362776,
    rank_range: "101-250",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 56174.524948965554,
    rank_range: "101-250",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 84125.95,
    rank_range: "251-500",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 64486,
    rank_range: "251-500",
    nation: "United States",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 54302.2318141907,
    rank_range: "251-500",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 30026.8092594664,
    rank_range: "251-500",
    nation: "Canada",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 65104.443661812555,
    rank_range: "251-500",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 11867.643305104735,
    rank_range: "251-500",
    nation: "Germany",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "salary",
    value: 59331.199555424435,
    rank_range: "251-500",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
  {
    group: "investment",
    value: 54997.74610220882,
    rank_range: "251-500",
    nation: "Australia",
    branch: "Electrical and Electronics Engineering",
  },
];

const addData = async (req, res) => {
  await rangeSchema.deleteMany();
  const data = await rangeSchema.insertMany(dataToInsert);
  res.json({ data });
};

const getData = async (req, res) => {
  const countries = await rangeSchema.distinct("nation");
  const salaryPipeline = [
    {
      $group: {
        _id: "$nation",
        totalSalary: {
          $sum: "$value",
        },
      },
    },
  ];

  const investmentPipeline = [
    {
      $group: {
        _id: "$nation",
        total_investments: {
          $sum: "$value",
        },
      },
    },
  ];

  const salaryContainer = await rangeSchema.aggregate(salaryPipeline);
  const investmetContainer = await rangeSchema.aggregate(investmentPipeline);
  const salaryObj = {};
  const investmentObj = {};
  salaryContainer.forEach((item) => {
    salaryObj[item._id] = item.totalSalary;
  });

  investmetContainer.forEach((item) => {
    investmentObj[item._id] = item.total_investments;
  });

  const barData = {
    labels: countries,
    datasets: [
      {
        label: "Salary",
        data: Object.values(salaryObj),
      },
      {
        label: "Investment",
        data: Object.values(investmentObj),
      },
    ],
  };
  res.json(barData);
};

export { addData, getData };
