import axios from 'axios';
import CardList from 'components/Card/CardList';
import FilterTutor from 'components/Card/FilterTutor';
import debouce from 'components/helper/debouce';
import { pagination } from 'components/helper/pagination';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import unidecode from 'unidecode';
const baseApi = `${process.env.REACT_APP_API_BASE_URL}/tutors`
const TutorPage = () => {
    const {isDarkMode} = useDarkModeContext()
    const redirect = useNavigate()
    const [isSearch, setIsSearch] = useState(false)
    const [nextPage, setNextPage] = useState(1)
    const [data, setData] = useState({})
    const [address, setAddress] = useState("")
    const [provinces, setProvinces] = useState([])
    const user = useSelector(state => state.user)

    const compareStr = (data, value) => {
        const result = convertStr(data)
        return result.includes(value.toLowerCase())
    }
    const convertStr = (value) => {
        const normalizedStr = unidecode(value); // Use unidecode library
        return normalizedStr.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    }
    const findAddress = (value) => {
        if(!value){
            getProvinces()
            return;
        }
        const addresses = provinces.filter(province => compareStr(province.province_name, value))
       
        setProvinces(addresses)
    }
    const chooseAddress = (value) => {
        const province = convertStr(value)
        window.history.pushState({}, "", `/tutors?province=${province}`)
        setAddress(value)
    }
    async function getProvinces() {
        try {
            const reseponse = await axios.get(`https://vapi.vnappmob.com/api/province`)
            console.log(reseponse);
            setProvinces(reseponse.data.results)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        
        getProvinces()
    }, [])
    const getUrlApi = (page) => {
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        const province = searchParams.get("province")
        const name = searchParams.get("name")
        if (!name && !province) {
            return `${baseApi}?page=${page}&limit=1`;
        }
        if (name && !province) {
            return `${baseApi}?name=${name}&page=${page}&limit=1`
        }
        else if (!name && province) {
            return `${baseApi}?province=${province}&page=${page}&limit=1`
        }
        else {
            return `${baseApi}?name=${name}&province=${province}&page=${page}&limit=1`
        }
    }
    const getTutors = async () => {
        try {
            const url = await getUrlApi(nextPage);
            console.log(url);
            const response = await axios.get(url)
            console.log(response);
            if (response.status === 200) {
                const { data } = response
                console.log(data);
                setData(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const searchUser = (value) => {
        debouce(() => {
            const province = convertStr(value)
            window.history.pushState({}, "", `/tutors?name=${province}`)
            setIsSearch(!isSearch)
        }, 500)
    }
    useEffect(() => {
        if (data.pageable) {

            pagination({
                page: "#pagination",
                pageItem: "page-item",
                pageIcon: "page-icon",
                totalPage: data.pageable.totalsPage,
                startPage: data.pageable.pageStart,
                visiblePages: Math.floor(data.pageable.totalsPage / 3),
                onPageClick: function (page) {
                    setNextPage(page)
                },
                handleNextPage: function () {
                    this.onPageClick(this.startPage + 1);
                },
                handlePrevPage: function () {
                    this.onPageClick(this.startPage - 1);
                }
            });
        }
    }, [data.pageable])
    useEffect(() => {
        let flag = true;
        if (flag) {

        }
        getTutors()
        return () => flag = false
    }, [address, nextPage, isSearch])
    const handleContactUser = (id) => {
        user.info && user.info.id ? redirect(`/chat?message=${id}`) : redirect("/login")
    }
    return (
        <div className={`${isDarkMode && 'bg-dark-section'} h-[640px]`}>

            <div className='md:w-[1400px] mx-auto py-4 flex flex-col justify-between h-full '>
                <div>
                    <FilterTutor provinces={provinces} searchUser={searchUser} findAddress={findAddress} chooseAddress={chooseAddress} address={address || "Address"}></FilterTutor>
                    <CardList onClick={handleContactUser} tutors={data?.tutors}></CardList>
                </div>
                <ul id='pagination'></ul>
            </div>
        </div>
    );
};

export default TutorPage;