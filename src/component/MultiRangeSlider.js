import React,{useRef,useState,useEffect,useCallback} from 'react'
import './scss/MultiSlider.scss'

//const MultiRangeSlider = ({min,max}) => {
const MultiRangeSlider = () => {
  //const {shopData, setShopData,saleData, setSaleData} = useGlobalContext();
  const min = 1;
  const max = 100;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
      (value: number) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
      }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
      }

  }, [maxVal, getPercent]);

  // // const handleSlideShop = () => {
  // //   //const filterShop = shopData.filter(item => item.price >= minVal);
  // //   const filterShop = data.filter((item) => {
  // //     return (item.price >= minVal && item.price <= maxVal )
  // // }, 0);
  // //   setShopData(filterShop);
  // // }

  // const handleSlideSale = () => {
  //   const filterSale = SaleData.filter((item) => {
  //     return (item.priceTwo >= minVal && item.priceTwo <= maxVal )
  // }, 0);
  //   setSaleData(filterSale);
  // }
  // useEffect(() =>{
  //   handleSlideShop();
  //   handleSlideSale();
  // },[minVal, maxVal])

  return (
      <div className="container">
        <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right"
        />

    <div className="slider">
      <div className="slider__track"></div>
      <div ref={range} className="slider__range"></div>
      <div className="slider__left-value">${minVal}</div>
      <div className="slider__right-value">${maxVal}</div>
    </div>
  </div>
  )
}

export default MultiRangeSlider
