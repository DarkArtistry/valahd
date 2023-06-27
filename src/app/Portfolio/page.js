"use client"
import Image from 'next/image'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './page.module.css';
import { Select, MenuItem, InputLabel, FormControl, TextField, 
    Accordion, AccordionSummary, AccordionDetails, Autocomplete,
    Typography, Button, Grid, Divider, Box, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import CryptoJS from 'crypto-js';
import ReactEcharts from "echarts-for-react"
// import DataEditor from "@glideapps/glide-data-grid";
import { LineChart } from '@mui/x-charts/LineChart';


// import "@glideapps/glide-data-grid/dist/index.css";

const StyledSelect = styled(Select)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiFormLabel-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
});

const StyledChip = styled(Chip)({
    "& .MuiChip-deleteIcon": {
        color: 'white',
    },
    '&:hover .MuiChip-deleteIcon': {
        color: 'white',
    },
    "& .MuiChip-label": {
        color: 'white',
    },
});

const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
    },
    "& .MuiInputBase-input": {
        color: "white",
    },
    "& .MuiFormLabel-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
});

const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-row': {
        height: '25px',
    },
    '& .MuiDataGrid-cell': {
        padding: '0 4px',
      },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: '#ef7f91', // Change this to the color you want on hover
    },
    '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: '#5b6dd5 !important', // Change this to the color you want for selected rows
    },
});

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "white"
    },
    "& .MuiFormLabel-root": {
      color: "white"
    }
  });

const CustomAccordion = styled(Accordion)({
    color: 'rgba(236,236,241,1)',
    background: '#673ab7',
});

export default function Portfolio() {

    const fileInput = useRef(null);
    const buttonRef = useRef();
    const prevDataGridRowsRef = useRef();

    const [geckoVsCurrencies, setGeckoVsCurrencies] = useState([])
    const [selectedBenchmarkCurrencies, setSelectedBenchmarkCurrencies] = useState('')

    const [geckoCoinList, setGeckoCoinList] = useState([])
    const [selectedGeckoCoinList, setSelectedGeckoCoinList] = useState([])
    const [unicornData, setUnicornData] = useState({})
    const [dataGridRows, setDataGridRows] = useState([])
    const [timeoutIds, setTimeoutIds] = useState([])
    const [secretKey, setSecretKey] = useState('');
    
    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
        .then(response => response.json())
        .then(data => {
            // Sort data by symbol
            data.sort((a, b) => a.localeCompare(b));
            console.log("data: ", data);
            setGeckoVsCurrencies(data)
        })
        .catch(error => console.error('Error:', error));

        fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => response.json())
        .then(data => {
            // Sort data by symbol
            data.sort((a, b) => a.name.localeCompare(b.name));
            console.log("data: ", data);
            // let data = data.map((eachData) => eachData.)
            setGeckoCoinList(data)
        })
        .catch(error => console.error('Error:', error));
    }, []);

    // handleGenerateSecretKey generates a 256 bit hash key
    const handleGenerateSecretKey = () => {
        let randomKey = CryptoJS.lib.WordArray.random(128/8); // Generate a 128-bit key
        let hashKey = CryptoJS.SHA256(randomKey).toString(); // Hash the key
        setSecretKey(hashKey)
    }

    // handle decryption of file
    const importState = (encryptedState) => {
        const bytes  = CryptoJS.AES.decrypt(encryptedState, secretKey);
        const originalState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("originalState: \n", originalState);
        // Now you can use originalState object to import your state.
        setDataGridRows(originalState.dataGridRows);
        setSelectedGeckoCoinList(originalState.selectedGeckoCoinList);
        setSelectedBenchmarkCurrencies(originalState.selectedBenchmarkCurrencies);
    }

    const handleFileRead = (e) => {
        const content = e.target.result;
        importState(content)
        setTimeout(() => {
            buttonRef.current.click();
        }, 1000);
        setTimeout(() => {
            buttonRef.current.click();
        }, 3000);
    };

    const handleFileChosen = (file) => {
        let fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
        fileInput.current.value = null;  // Clear the file input
    };

    // Function to trigger the file input's click event
    const handleButtonClick = () => {
        fileInput.current.click();
    };

    const handleExportState = () => {
        const modifiedDataGridRows = dataGridRows.map((eachRow) => {
            eachRow['setCommunityData'] = false
            eachRow['setPriceData'] = false
            return eachRow;
        })
        const stateAsString = JSON.stringify({
            dataGridRows: modifiedDataGridRows,
            selectedGeckoCoinList: selectedGeckoCoinList,
            selectedBenchmarkCurrencies: selectedBenchmarkCurrencies,
        });
        const encryptedState = CryptoJS.AES.encrypt(stateAsString, secretKey).toString();
        // Now you can use encryptedState string to export your state.
        console.log(encryptedState);

        // Create a Blob with the encrypted data
        let blob = new Blob([encryptedState], {type: "text/plain;charset=utf-8"});

        // Create a hidden download link and append it to the body
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Valahd_encryptedState.txt";  // Name of the downloaded file
        link.style.display = "none";
        document.body.appendChild(link);

        // Programmatically click the download link
        link.click();

        // Remove the link when done
        document.body.removeChild(link);
    }

    const handleBenchmarkCurrenciesSelect = (event) => {
        setSelectedBenchmarkCurrencies(event.target.value);
    };

    const handleCoinSelect = (event) => {
        if (event.target.value[event.target.value.length - 1] === null) {
            setSelectedGeckoCoinList([]);
        } else {
            setSelectedGeckoCoinList(event.target.value);
        }
    };

    const handleCoinGeckoRequest = () => {
        fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => response.json())
        .then(data => {
            // Sort data by symbol
            data.sort((a, b) => a.name.localeCompare(b.name));
            console.log("data: ", data);
            // let data = data.map((eachData) => eachData.)
            setGeckoCoinList(data)
        })
        .catch(error => console.error('Error:', error));
    }

    const handleFetchMarketData = async () => {
        const selectedCryptoIds = selectedGeckoCoinList.map((coin) => coin.id)
        // CoinGecko Set Up
        const coinGeckoMarketDataResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedBenchmarkCurrencies}&ids=${selectedCryptoIds.join("%2C")}&order=market_cap_asc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y&locale=en&precision=18`)
        const coinGeckoMarketData = await coinGeckoMarketDataResponse.json();
        // DefilLama Set Up
        const defilLamaChainsResponse = await fetch(`https://api.llama.fi/v2/chains`);
        const defilLamaChainsData = await defilLamaChainsResponse.json();
        const defilLamaGecoMap = {}
        defilLamaChainsData.map((eachCoin)=> {
            defilLamaGecoMap[eachCoin.gecko_id] = {
                gecko_id: eachCoin.gecko_id, 
                tvl: eachCoin.tvl, 
                tokenSymbol: eachCoin.tokenSymbol, 
                cmcId: eachCoin.cmcId, 
                deFilLamaName: eachCoin.name, 
                chainId: eachCoin.chainId, 
            };
        })
        let tempData = {}
        let newDataGridRows = await Promise.all(coinGeckoMarketData.map(async (eachMarketData) => {
            let eachMarketDataModified = eachMarketData
            eachMarketDataModified['circulating_supply_percentage'] = eachMarketDataModified['circulating_supply'] / eachMarketDataModified['total_supply']
            tempData[eachMarketData.id] = {...defilLamaGecoMap[eachMarketData.id], ...eachMarketData }
            console.log('defilLamaGecoMap[eachMarketData.id]: ', defilLamaGecoMap[eachMarketData.id]);
            // Fetch historical TVL from DefilLama
            if (defilLamaGecoMap[eachMarketData.id]) {
                const defilLamaTvlResponse = await fetch(`https://api.llama.fi/v2/historicalChainTvl/${defilLamaGecoMap[eachMarketData.id]['deFilLamaName']}`);
                const defilLamaTvlData = await defilLamaTvlResponse.json();
    
                tempData[eachMarketData.id]['defillama_tvl'] = defilLamaTvlData
                eachMarketData['defillama_tvl'] = defilLamaTvlData
            }
            return eachMarketData
        }))
        setUnicornData(tempData)
        setDataGridRows(newDataGridRows)
    }

    const coinGeckoRefresher = async () => {
        if (!dataGridRows && dataGridRows.length) return;
        for(let i = 0; i < timeoutIds.length; i++) {
            clearTimeout(timeoutIds[i]);
        }
        let setCommunityData = true
        let setPriceData = true
        let dataGridRowsWithCommunityData = []
        let dataGridRowsWithCommunityAndPriceData = []
        dataGridRowsWithCommunityData = await Promise.all(dataGridRows.map(async(eachRow) => {
                try {
                    if (!eachRow['setCommunityData']) {
                        const cgCommResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${eachRow.id}?tickers=false&market_data=false&community_data=true&developer_data=false&sparkline=false`)
                        const cgCommData = await cgCommResponse.json();
                        console.log('cgCommData: ', cgCommData);
                        eachRow['community_data'] = cgCommData['community_data'];
                        eachRow['setCommunityData'] = true;
                    }
                    return eachRow;
                } catch (e) {
                    console.log('Error commdata : ',e);
                    setCommunityData = false;
                    return eachRow
                }
        }))

        console.log("dataGridRowsWithCommunityData : ", dataGridRowsWithCommunityData);

        dataGridRowsWithCommunityAndPriceData = await Promise.all(dataGridRowsWithCommunityData.map(async(eachRow) => {
                try {
                    if (!eachRow['setPriceData']) {
                        const cgPriceResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${eachRow.id}/market_chart?vs_currency=${selectedBenchmarkCurrencies}&days=max&interval=daily&precision=18`)
                        const cgPriceData = await cgPriceResponse.json();
                        console.log('cgPriceDataL: ', cgPriceData);
                        eachRow['historic_prices'] = cgPriceData['prices'];
                        eachRow['historic_volumes'] = cgPriceData['total_volumes'];
                        eachRow['setPriceData'] = true;
                    }
                    return eachRow;
                } catch (e) {
                    console.log('Error price data : ',e);
                    setPriceData = false;
                    return eachRow
                }
            }))

        console.log("dataGridRowsWithCommunityAndPriceData : ", dataGridRowsWithCommunityAndPriceData);

        if (!setPriceData || !setCommunityData) {
            let timeoutId = setTimeout(() => {
                coinGeckoRefresher()
            }, 70000);
            setTimeoutIds([...timeoutIds, timeoutId])
        } else {
            for(let i = 0; i < timeoutIds.length; i++){
                clearTimeout(timeoutIds[i]);
            }
        }

        setDataGridRows(dataGridRowsWithCommunityAndPriceData);
    }

    useEffect(() => {
        if (JSON.stringify(prevDataGridRowsRef.current) != JSON.stringify(dataGridRows)) {
            prevDataGridRowsRef.current = dataGridRows;
            coinGeckoRefresher();
        }
      },[dataGridRows]);

    const dataGridColumns = [
        {
            headerName: "Name",
            field: "name"
        },
        {
            headerName: "Symbol",
            field: "symbol",
            renderCell: (params) => {
                let symbolText = (params && params.row && params.row.symbol)
                return symbolText.toUpperCase()
            }
        },
        {
            headerName: "Image",
            field: "image",
            width: 50,
            renderCell: (params) => {
                let imgeUrl = (params && params.row && params.row.image) || []
                return <Image width={50} src={imgeUrl} height={50}/>
            }
        },
        {
            headerName: "Current Price",
            field: "current_price",
            width: 100,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.current_price) || ""}`
                return data
            }
        },
        {
            headerName: "Price History",
            field: "historic_prices",
            width: 200,
            renderCell: (params) => {
                let datetimePrice = (params && params.row && params.row.historic_prices) || []
                console.log('datetimePrice: ', datetimePrice);
                if (!datetimePrice.length) return ''
                let dateArr = [];
                let valueArr = [];
                datetimePrice.map((eachData, index) => {
                    if (index % 7 != 0) return
                    if (eachData.length < 2) return
                    console.log("eachData : ", eachData);
                    // push value
                    valueArr.push(eachData[1]);
                    // push date
                    let dateObject = new Date(eachData[0] * 1000); 
                    // push !
                    dateArr.push(dateObject)
                })
                console.log('historic_prices');
                console.log('dateArr : ', dateArr);
                console.log('valueArr : ', valueArr);
                return (
                    <LineChart
                    sx={{
                        marginTop: '-30px',
                        '& .MuiPopover-root': {
                            zIndex: 1000,
                            fontSize: '8px'
                        },
                        '& .MuiMarkElement-root': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-tickLabel': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-line': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-tickContainer': {
                            display: 'none',
                        }
                    }}
                    key={(params.row && params.row.id) || index}
                    xAxis={[{ data: dateArr }]}
                    series={[
                        {
                        data: valueArr,
                        },
                    ]}
                    width={200}
                    height={200}
                />)
            },
        },
        {
            headerName: "Total Volume History",
            field: "historic_volumes",
            width: 200,
            renderCell: (params) => {
                let datetimeVolume = (params && params.row && params.row.historic_volumes) || []
                console.log('datetimeVolume: ', datetimeVolume);
                if (!datetimeVolume.length) return ''
                let dateArr = [];
                let valueArr = [];
                datetimeVolume.map((eachData, index) => {
                    if (index % 7 != 0) return
                    if (eachData.length < 2) return
                    console.log("eachData : ", eachData);
                    // push value
                    valueArr.push(eachData[1]);
                    // push date
                    let dateObject = new Date(eachData[0] * 1000); 
                    // push !
                    dateArr.push(dateObject)
                })
                console.log('historic_volumes');
                console.log('dateArr : ', dateArr);
                console.log('valueArr : ', valueArr);
                return (
                    <LineChart
                    sx={{
                        marginTop: '-30px',
                        '& .MuiPopover-root': {
                            zIndex: 1000,
                            fontSize: '8px'
                        },
                        '& .MuiMarkElement-root': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-tickLabel': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-line': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-tickContainer': {
                            display: 'none',
                        }
                    }}
                    key={(params.row && params.row.id) || index}
                    xAxis={[{ data: dateArr }]}
                    series={[
                        {
                            data: valueArr,
                        },
                    ]}
                    width={200}
                    height={200}
                />)
            },
        },
        {
            headerName: "Market Cap",
            field: "market_cap",
            width: 120,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.market_cap) || ""}`
                return data
            }
        },
        {
            headerName: "Market Cap Rank",
            field: "market_cap_rank",
            width: 50,
        },
        {
            headerName: "Fully Diluted Valuation",
            field: "fully_diluted_valuation",
            width: 150,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.fully_diluted_valuation) || ""}`
                return data
            }
        },
        {
            headerName: "Circulating Supply",
            field: "circulating_supply",
            width: 150,
        },
        {
            headerName: "Circulating Supply %",
            field: "circulating_supply_percentage",
            width: 150,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.circulating_supply_percentage) || ""} %`
                return data
            }
        },
        {
            headerName: "Total Supply",
            field: "total_supply",
            width: 150,
        },
        {
            headerName: "Total Locked Valued (TVL)",
            field: "defillama_tvl",
            width: 200,
            renderCell: (params) => {
                console.log("renderCell params :", params);
                let datetimeTvl = (params && params.row && params.row.defillama_tvl) || []
                if (!datetimeTvl.length) return ''
                let dateArr = [];
                let valueArr = [];
                datetimeTvl.map((eachData, index) => {
                    if (index % 7 != 0) return
                    // push value
                    valueArr.push(eachData.tvl);
                    // push date
                    let dateObject = new Date(eachData.date * 1000); 
                    let date = dateObject.getDate();
                    let month = dateObject.getMonth() + 1; // getMonth() returns months from 0-11, so +1 to get the actual month
                    let year = dateObject.getFullYear();
                    // add leading zeros to date and month if they are less than 10
                    if(date < 10) date = '0' + date;
                    if(month < 10) month = '0' + month;
                    let localDate = `${date}/${month}/${year}`;
                    // push !
                    dateArr.push(dateObject)
                })
                console.log('defillama_tvl');
                console.log('dateArr : ', dateArr);
                console.log('valueArr : ', valueArr);
                return (
                    <LineChart
                    sx={{
                        marginTop: '-30px',
                        '& .MuiPopover-root': {
                            zIndex: 1000,
                            fontSize: '8px'
                        },
                        '& .MuiMarkElement-root': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-tickLabel': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-line': {
                            display: 'none',
                        },
                        '& .MuiChartsAxis-tickContainer': {
                            display: 'none',
                        }
                    }}
                    key={params.row.id}
                    xAxis={[{ data: dateArr }]}
                    series={[
                        {
                        data: valueArr,
                        },
                    ]}
                    width={200}
                    height={200}
                />)
            },
        },
        {
            headerName: "FaceBook Likes",
            field: "community_data.facebook_likes",
            width: 100,
            renderCell: (params) => {
                let commData = (params && params.row && params.row.community_data) || {}
                return commData.facebook_likes
            }
        },
        {
            headerName: "Twitter Followers",
            field: "community_data.twitter_followers",
            width: 100,
            renderCell: (params) => {
                let commData = (params && params.row && params.row.community_data) || {}
                return commData.twitter_followers
            }
        },
        {
            headerName: "Reddit Subscribers",
            field: "community_data.reddit_subscribers",
            width: 100,
            renderCell: (params) => {
                let commData = (params && params.row && params.row.community_data) || {}
                return commData.reddit_subscribers
            }
        },
        {
            headerName: "Telegram Members",
            field: "community_data.telegram_channel_user_count",
            width: 100,
            renderCell: (params) => {
                let commData = (params && params.row && params.row.community_data) || {}
                return commData.telegram_channel_user_count
            }
        },
        {
            headerName: "24hr High Price",
            field: "high_24h",
            width: 100,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.high_24h) || ""}`
                return data
            }
        },
        {
            headerName: "24hr Low Price",
            field: "low_24h",
            width: 100,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.low_24h) || ""}`
                return data
            }
        },
        {
            headerName: "24hr Price Change %",
            field: "price_change_percentage_24h",
            width: 100,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.price_change_percentage_24h) || ""} %`
                return data
            }
        },
        {
            headerName: "24hr Market Cap Change %",
            field: "market_cap_change_percentage_24h",
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.market_cap_change_percentage_24h) || ""} %`
                return data
            } 
        },
        {
            headerName: "All Time High",
            field: "ath",
            width: 200,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.ath) || ""}`
                return data
            }
        },
        {
            headerName: "All Time High %",
            field: "ath_change_percentage",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.ath_change_percentage) || ""} %`
                return data
            }
        },
        {
            headerName: "All Time High Date",
            field: "ath_date",
            width: 200,
        },
        {
            headerName: "All Time Low",
            field: "atl",
            width: 200,
            renderCell: (params) => {
                let data = `${selectedBenchmarkCurrencies} ${(params && params.row && params.row.atl) || ""}`
                return data
            }
        },
        {
            headerName: "All Time Low %",
            field: "atl_change_percentage",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.atl_change_percentage) || ""}%`
                return data
            }
        },
        {
            headerName: "All Time Low Date",
            field: "atl_date",
            width: 200,
        },
        {
            headerName: "Price Change (1hr)",
            field: "price_change_percentage_1h_in_currency",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.price_change_percentage_1h_in_currency) || ""}%`
                return data
            }
        },
        {
            headerName: "Price Change (24hr)",
            field: "price_change_percentage_24h_in_currency",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.price_change_percentage_24h_in_currency) || ""}%`
                return data
            }
        },
        {
            headerName: "Price Change (7 days)",
            field: "price_change_percentage_7d_in_currency",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.price_change_percentage_7d_in_currency) || ""}%`
                return data
            }
        },
        {
            headerName: "Price Change (30 days)",
            field: "price_change_percentage_30d_in_currency",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.price_change_percentage_30d_in_currency) || ""}%`
                return data
            }
        },
        {
            headerName: "Price Change (200 days)",
            field: "price_change_percentage_200d_in_currency",
            width: 200,
            renderCell: (params) => {
                let data = `${(params && params.row && params.row.price_change_percentage_30d_in_currency) || ""}%`
                return data
            }
        }
    ]

  return (
    <div className={styles.portfolio}>
        <input type='file'
            id='file'
            ref={fileInput}
            onChange={e => handleFileChosen(e.target.files[0])}
            style={{ display: 'none'}} // hide default file input
        />
        <Button variant="contained" onClick={handleButtonClick}>
            Upload Valahd File
        </Button>&nbsp;
        <Button variant="contained" onClick={handleExportState}>
            Export Valahd File
        </Button>&nbsp;
        <Button variant="contained" onClick={handleGenerateSecretKey}>
            Generate Valahd Secret Key
        </Button>
        <br/><br/>
        <FormControl fullWidth>
            <InputLabel sx={{color: 'white'}} id="benchmark-currencies-label">Select Benchmark Currencies</InputLabel>
            <StyledSelect
                labelId="benchmark-currencies-label"
                id="benchmark-currencies"
                label="Select Benchmark Currencies"
                value={selectedBenchmarkCurrencies}
                onChange={handleBenchmarkCurrenciesSelect}
                fullWidth
            >
                {geckoVsCurrencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                    {currency && currency.toUpperCase()}
                </MenuItem>
                ))}
            </StyledSelect>
            <br/><br/>
        </FormControl>
        <StyledAutocomplete
            multiple
            fullWidth={true}
            limitTags={50}
            id="mutiple-geco-coin-list"
            options={geckoCoinList}
            value={selectedGeckoCoinList}
            onChange={(event, newValue) => {
                setSelectedGeckoCoinList(newValue);
            }}
            getOptionLabel={(coin) => `${coin && coin.symbol && coin.symbol.toUpperCase()} - ${coin && coin.name && coin.name.toUpperCase()}`}
            defaultValue={[]}
            renderInput={(params) => {
                return (
                    <StyledTextField {...params} label="Search Cryptocurrencies" placeholder="Search Cryptocurrencies" />
                )
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderTags={(tagValue, getTagProps) => (
                    tagValue.map((coin, index) => {
                        const { key, ...otherProps } = getTagProps({ index });
                        console.log("otherProps: ", otherProps);
                        return (
                        <StyledChip
                            key={`${coin.id}-${index}`}
                            label={`${coin && coin.symbol && coin.symbol.toUpperCase()} - ${coin && coin.name && coin.name.toUpperCase()}`}
                            {...otherProps}
                        />
                    )}))
            }
            disabled={geckoCoinList.length === 0}
        />
            <br/><br/>
            {geckoCoinList.length === 0 && <Button variant="contained" fullWidth onClick={handleCoinGeckoRequest}>CoinGecko Rate Limit Exceeded. Click this button after 1 minute.</Button>}
            {geckoCoinList.length > 0 && <Button ref={buttonRef} variant="contained" fullWidth onClick={handleFetchMarketData}>Fetch Market Data</Button>}
        <br/><br/>
        {
            dataGridRows && dataGridRows.length && <Box sx={{ height: 500, width: '100%' }}>
            <StyledDataGrid
                style={{
                    backgroundColor: '#f7f7f700',
                    color: 'white'
                }}
                rows={dataGridRows}
                columns={dataGridColumns}
                initialState={{
                }}
                pageSizeOptions={[100]}
                paginationMode={'client'}
            />
        </Box>
        }
    </div>
  );
}