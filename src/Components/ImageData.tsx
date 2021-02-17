import Animated from "react-native-reanimated";
import React, { useState } from "react";
import { WStyle } from "../style";

const carImages = [
  require("../../assets/car_data/super_car_0001.png"),
  require("../../assets/car_data/super_car_0002.png"),
  require("../../assets/car_data/super_car_0003.png"),
  require("../../assets/car_data/super_car_0004.png"),
  require("../../assets/car_data/super_car_0005.png"),
  require("../../assets/car_data/super_car_0006.png"),
  require("../../assets/car_data/super_car_0007.png"),
  require("../../assets/car_data/super_car_0008.png"),
  require("../../assets/car_data/super_car_0009.png"),
  require("../../assets/car_data/super_car_0010.png"),
  require("../../assets/car_data/super_car_0011.png"),
  require("../../assets/car_data/super_car_0012.png"),
  require("../../assets/car_data/super_car_0013.png"),
  require("../../assets/car_data/super_car_0014.png"),
  require("../../assets/car_data/super_car_0015.png"),
  require("../../assets/car_data/super_car_0016.png")
];

export enum keyList {
  id = "id",
  name = "name",
  Manufacturer = "Manufacturer",
  MSRP = "MSRP",
  Year = "Year",
  Vehicle_type = "Vehicle_type",
  Engine = "Engine",
  Power = "Power",
  Length = "Length",
  Width = "Width",
  Height = "Height",
  Weight = "Weight",
  Passengers = "Passengers",
  Zero_100 = "Zero_100",
  Top_speed = "Top_speed",
}

type carsSpecificationsType = {
  [key in keyList]? : string
}

export interface carsSpecificationsProps extends carsSpecificationsType {};

export const carsSpecifications : carsSpecificationsProps[] = [
  {
    id: "01-SUPERCAR",
    name: "PAGANI HUAYRA",
    Manufacturer: "Pagani Automobili S.p.A.",
    MSRP: "$2,400,000",
    Year: "2019",
    Vehicle_type: "Roadster",
    Engine: "6,0 l V12",
    Power: "764 hp @ 5,500 rpm (570 kW)",
    Length: "4,605 mm (181″)",
    Width: "2,036 mm (80″)",
    Height: "1,169 mm (46″)",
    Weight: "1,280 kg (2,822 lb)",
    Passengers: "2",
    Zero_100: "3.0 sec",
    Top_speed: "360 km/h (224 mph) "
  },
  {
    id: "02-SUPERCAR",
    name: "McLaren P1",
    Manufacturer: "McLaren Automotive",
    MSRP: "$1,190,000",
    Year: "2014",
    Vehicle_type: "Coupe",
    Engine: "3,8 l V8",
    Power: "727 hp @ 7,300 rpm (542 kW)",
    Length: "4,588 mm (181″)",
    Width: "2,144 mm (84″)",
    Height: "1,188 mm (47″)",
    Weight: "1,395 kg (3,075 lb)",
    Passengers: "2",
    Zero_100: "3.0 sec",
    Top_speed: "350 km/h (217 mph) "
  },
  {
    id: "03-SUPERCAR",
    name: "Lamborghini Aventador",
    Manufacturer: "Lamborghini",
    MSRP: "CA$443,804",
    Year: "2015",
    Vehicle_type: "Coupe",
    Engine: "6,5 l V12",
    Power: "700 hp @ 8,250 rpm (522 kW)",
    Length: "4,780 mm (188″)",
    Width: "2,030 mm (80″)",
    Height: "1,136 mm (45″)",
    Weight: "1,575 kg (3,472 lb)",
    Passengers: "2",
    Zero_100: "2.9 sec",
    Top_speed: "350 km/h (217 mph) "
  },
  {
    id: "04-SUPERCAR",
    name: "Porsche 911 Carrera",
    Manufacturer: "Porsche",
    MSRP: "$66,775",
    Year: "1995",
    Vehicle_type: "Coupe",
    Engine: "Carrera 4S 3.6 (285 Hp)",
    Power: "285 Hp @ 6100 rpm.",
    Length: "4,460 mm (176″)",
    Width: "1,808 mm (71″)",
    Height: "1,311 mm (52″)",
    Weight: "1,395 kg (3,075 lb)",
    Passengers: "4",
    Zero_100: "5.3 sec",
    Top_speed: "270 km/h 167.77 mph"
  },
  {
    id: "05-SUPERCAR",
    name: "Ferrari F12 Berlinetta",
    Manufacturer: "Ferrari",
    MSRP: "$369,900",
    Year: "2014",
    Vehicle_type: "Coupe",
    Engine: "6,3 l V12",
    Power: "731 hp @ 8,250 rpm (545 kW)",
    Length: "4,618 mm (182″)",
    Width: "1,942 mm (76″)",
    Height: "1,273 mm (50″)",
    Weight: "1,630 kg (3,594 lb)",
    Passengers: "2",
    Zero_100: "3.1 sec",
    Top_speed: "340 km/h (211 mph)"
  },
  {
    id: "06-SUPERCAR",
    name: "Ferrari testarossa",
    Manufacturer: "Ferrari",
    MSRP: "$369,900",
    Year: "1984",
    Vehicle_type: "Coupe",
    Engine: "F113 A000",
    Power: "385 bhp @ 6300 rpm ((287 kW)",
    Length: "4485 mm (176.6″)",
    Width: "1,942 mm (76″)",
    Height: "1130 mm (44.5″)",
    Weight: "1506 kg (3320 lb)",
    Passengers: "2",
    Zero_100: "5.2 sec",
    Top_speed: "275 km/h (171 mph)"
  },
  {
    id: "07-SUPERCAR",
    name: "Lamborghini Gallardo",
    Manufacturer: "Lamborghini",
    MSRP: "$289,500",
    Year: "2014",
    Vehicle_type: "Coupe",
    Engine: "5,2 l V10",
    Power: "550 hp @ 8,000 rpm (410 kW)",
    Length: "4,345 mm (171″)",
    Width: "1,900 mm (75″)",
    Height: "1,165 mm (46″)",
    Weight: "1,380 kg (3,042 lb)",
    Passengers: "2",
    Zero_100: "3.9 sec",
    Top_speed: "320 km/h (199 mph)"
  },
  {
    id: "08-SUPERCAR",
    name: "Bugatti Chiron",
    Manufacturer: "Bugatti",
    MSRP: "€2,500,000",
    Year: "2017",
    Vehicle_type: "Coupe",
    Engine: "8,0 l W16",
    Power: "1,479 hp @ 6,900 rpm (1,103 kW)",
    Length: "4,544 mm (179″)",
    Width: "2,038 mm (80″)",
    Height: "1,212 mm (48″)",
    Weight: "1,995 kg (4,398 lb)",
    Passengers: "2",
    Zero_100: "2.5 sec",
    Top_speed: "420 km/h (261 mph) "
  },
  {
    id: "09-SUPERCAR",
    name: "Porsche Panamera",
    Manufacturer: "Porsche",
    MSRP: "$198,100",
    Year: "2012",
    Vehicle_type: "Coupe",
    Engine: "3.6L V6",
    Power: "300-hp",
    Length: "4,968 mm (196″)",
    Width: "1,930 mm (76″)",
    Height: "1,417 mm (56″)",
    Weight: "N/A",
    Passengers: "4",
    Zero_100: "N/A",
    Top_speed: "N/A"
  },
  {
    id: "10-SUPERCAR",
    name: "Audi R8",
    Manufacturer: "Audi",
    MSRP: "$233,400",
    Year: "2021",
    Vehicle_type: "Coupe",
    Engine: "5,2 l V10",
    Power: "562 hp @ 8,100 rpm (419 kW)",
    Length: "4,427 mm (174″)",
    Width: "1,941 mm (76″)",
    Height: "1,240 mm (49″)",
    Weight: "1,660 kg (3,660 lb)",
    Passengers: "2",
    Zero_100: "3.5 sec",
    Top_speed: "323 km/h (201 mph)"
  },
  {
    id: "11-SUPERCAR",
    name: "Mercedes-Benz SLR McLaren",
    Manufacturer: "McLaren Automotive",
    MSRP: "N/A",
    Year: "2010",
    Vehicle_type: "Coupe",
    Engine: "M155 SLR V8",
    Power: "617 hp (460 kW; )",
    Length: "4,656 mm (183.3 in)",
    Width: "1,908.5 mm (75.14 in)",
    Height: "1,261 mm (49.6 in)",
    Weight: "1,791.5 kg (3,950 lb)",
    Passengers: "2",
    Zero_100: "3.4 sec",
    Top_speed: "334 km/h (208 mph)"
  },
  {
    id: "12-CONCEPTCAR",
    name: "Concept Car by Lee Rosario",
  },
  {
    id: "13-CONCEPTCAR",
    name: "Concept Car by Lee Rosario",
  },
  {
    id: "14-CONCEPTCAR",
    name: "Concept Car by Lee Rosario",
  },
  {
    id: "15-CONCEPTCAR",
    name: "Concept Car by Lee Rosario",
  },
  {
    id: "16-CONCEPTCAR",
    name: "Concept Car by Lee Rosario",
  },
];

type carElProps = {
  index: number;
};

const CarsElement = ({ index }: carElProps) => {
  const [images, _] = useState(carImages);
  return (
    <Animated.Image
      style={WStyle.car_image}
      source={images[index]}
      resizeMode={"contain"}
    />
  );
};

export default CarsElement;
