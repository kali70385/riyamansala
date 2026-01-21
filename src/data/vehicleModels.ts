// Vehicle models data parsed from vehicleModelsData.txt
// This file provides a structured format for model autocomplete

export type VehicleModelsData = Record<string, Record<string, string[]>>;

// Parse the text file format into structured data
const parseVehicleModelsData = (): VehicleModelsData => {
  const data: VehicleModelsData = {};
  
  // Parsed data from vehicleModelsData.txt
  const rawData: VehicleModelsData = {
    "Cars": {
      "Toyota": ["Corolla", "Corolla AE80", "Corolla AE90", "Corolla AE100", "Corolla AE110", "Corolla NZE121", "Corolla NZE141", "Corolla NZE161", "Axio", "Vitz", "Premio", "Aqua", "Prius", "Allion", "Belta", "Yaris", "Crown", "Camry", "Starlet", "Corona", "Carina", "Tercel", "Platz", "Soluna", "Cynos", "Paseo", "Sera", "Mirai", "Century", "bZ3", "bZ7", "GR Yaris", "Aygo X", "Auris", "Avensis", "Celica", "Cressida", "MR2", "Previa", "Echo", "FJ Cruiser", "GR86", "GR Supra", "Avalon"],
      "Suzuki": ["Alto", "Wagon R", "Swift", "Baleno", "Celerio", "Cultus", "Maruti 800", "Dzire", "Ciaz", "Ignis", "S-Presso", "Zen", "Esteem", "Aerio/Liana", "Cappuccino", "Cara", "Cervo", "Forenza/Reno", "Fronte", "Fun", "Karimun", "Kei", "Kizashi", "Mighty Boy", "MR Wagon", "Palette", "Splash", "Suzulight", "Swift+", "SX4", "Twin", "Verona", "X90", "Fronx", "Spacia", "Solio", "Landry"],
      "Honda": ["Civic", "Civic EG", "Civic EK", "Civic ES", "Civic FD", "Civic FB", "Civic FC", "City", "Fit", "Grace", "Insight", "Accord", "Shuttle", "Amaze", "Brio", "Integra", "Crider/Envix", "Jazz/Life", "Prelude", "S2000", "CR-Z", "NSX", "Clarity", "Crosstour", "e", "CR-X", "CR-X del Sol", "S660", "N-Box", "N-Van", "N-One", "N-WGN", "1300", "S500", "S600", "S800"],
      "Nissan": ["March", "Tiida", "Sunny", "Sunny B11", "Sunny B12", "Sunny B13", "Sunny B14", "Sunny FB15", "Sunny N16", "Sunny N17", "Bluebird", "Leaf", "Skyline", "Teana", "Cefiro", "Pulsar", "Presea", "Note", "Almera", "Versa", "V-Drive", "Altima", "Sentra", "Sylphy", "Maxima", "Z", "GT-R", "Sakura", "N7"],
      "Mitsubishi": ["Lancer", "Lancer Box", "Lancer CK", "Lancer CS", "Lancer CY", "Galant", "Mirage", "Colt", "Attrage", "Colt Plus", "eK Wagon", "eK X EV", "Delica Mini", "Model A", "500", "Minica", "Colt 1000", "Lancer Evolution", "Sigma", "Starion", "Cordia", "Tredia", "Eclipse", "Diamante", "3000GT", "Carisma", "i-MiEV"],
      "Tata": ["Nano", "Indica", "Indigo", "Tiago", "Tigor", "Zest", "Altroz", "Tiago EV", "Tigor EV", "Altroz EV", "Avinya"],
      "Micro": ["Panda", "Panda Cross", "Geely MK", "MX7", "Trend", "Privilege", "MPV Junior 3", "MPV"],
      "Daihatsu": ["Charade", "Cuore", "Mira", "Sirion", "Esse", "Trevis", "Storia", "Domino", "Atrai", "Ayla", "Boon", "Cast", "Copen", "Luxio", "Move", "Move Canbus", "Sigra", "Taft", "Tanto", "Thor", "Wake", "Altis", "Applause", "Be-go", "Bee", "Boon Luminas", "Ceria", "Charade Centro", "Charmant", "Compagno", "Consorte", "Coo", "Fellow", "Fellow Max", "Grand Move", "Handi", "Handivan", "Leeza", "Materia", "Max", "Mebius", "Mira Cocoa", "Mira Gino", "Mira Tocot", "Move Conte", "Move Latte", "Naked", "Opti", "P3", "P5", "Pyzar", "Sonica", "Tanto Exe", "YRV"],
      "Hyundai": ["Elantra", "Accent", "Sonata", "i10", "i20", "Grand i10", "Eon", "Atos", "Getz", "Avante", "i30 Sedan", "Elantra N", "Grandeur", "Azera", "Aura", "Grand i10 Sedan", "Grand Metro", "HB20S", "Ioniq 6", "i30", "i30 Tourer", "i30 Fastback", "HB20", "Ioniq Hybrid", "Ioniq Electric"],
      "Mercedes-Benz": ["C-Class", "C-Class W202", "C-Class W203", "C-Class W204", "C-Class W205", "E-Class", "E-Class W124", "E-Class W210", "E-Class W211", "E-Class W212", "E-Class W213", "S-Class", "S-Class W126", "S-Class W140", "S-Class W220", "S-Class W221", "S-Class W222", "A-Class", "B-Class", "CLA", "Maybach S-Class", "E-Class Wagon", "C-Class Wagon", "CLA Coupe", "C-Class Coupe", "E-Class Coupe", "AMG GT Coupe", "CLE Coupe", "C-Class Cabriolet", "E-Class Cabriolet", "SL Roadster", "CLE Cabriolet", "EQE Sedan", "EQS Sedan", "CLS", "SLC Roadster", 'W113 SL-Class "Pagoda"', "500E", "300 SL"],
      "Kia": ["Picanto", "Rio", "Cerato", "Forte", "Spectra", "Sephia", "Pride", "K3", "K4", "K5", "Optima", "K8", "K9", "K900", "Pegas", "Soluto", "Amanti", "Cadenza", "Stinger", "Clarus", "Joice", "Opirus", "Retona", "Shuma", "Venga", "Magentis", "Avella", "Brisa", "Concord/Capital", "Credos", "Enterprise", "Elan/Vigato", "Ceed", "EV4"],
      "Ford": ["Focus", "Fiesta", "Laser", "Escort", "Telstar", "Mustang", "Mondeo", "Taurus", "Model T", "Model A", "Fusion", "Pinto", "Crown Victoria", "Thunderbird", "Falcon"],
      "Perodua": ["Viva", "Axia", "Bezza", "Kelisa", "Kancil", "Myvi", "Alza", "Kenari"],
      "Renault": ["Kwid", "Fluence", "Clio", "Megane", "Symbol", "5 E-Tech", "Lutecia", "City K-ZE", "Climber", "Kardian", "Mégane E-Tech Electric", "Twingo E-Tech", "Zoe", "Avantime", "Fuego", "Laguna", "Modus", "Pulse", "Safrane", "Scala", "Twingo", "Twizy", "Vel Satis", "Wind"],
      "Peugeot": ["206", "306", "406", "508", "405", "205", "309", "208", "e-208", "308", "e-308", "308 SW", "408", "e-408", "108", "104", "106", "107", "207", "301", "304", "305", "307", "404", "407", "504", "505", "604", "605", "607", "806", "807", "1007", "RCZ", "iOn"],
      "BMW": ["3 Series", "3 Series E30", "3 Series E36", "3 Series E46", "3 Series E90", "3 Series F30", "5 Series", "5 Series E34", "5 Series E39", "5 Series E60", "5 Series F10", "7 Series", "7 Series E32", "7 Series E38", "7 Series E65", "7 Series F01", "1 Series", "2 Series", "2 Series Coupe", "2 Series Gran Coupe", "2 Series Active Tourer", "4 Series", "4 Series Coupe", "4 Series Convertible", "4 Series Gran Coupe", "6 Series", "6 Series Gran Turismo", "8 Series", "8 Series Coupe", "8 Series Gran Coupe", "8 Series Convertible", "Z4 Roadster", "i4", "i4 Gran Coupe", "i5", "i5 Sedan", "i5 Touring", "i7", "i7 Sedan", "M2", "M3", "M3 Sedan", "M3 Touring", "M4", "M4 Coupe", "M4 Convertible", "M5", "M5 Sedan", "M5 Touring", "M8", "M8 Coupe", "M8 Gran Coupe", "M8 Convertible", "i3", "i8", "3 Series Gran Turismo", "5 Series Gran Turismo", "Z3", "Z8", "M1", "1 Series M Coupe"],
      "Audi": ["A3", "A4", "A6", "A8", "A1", "80", "100", "A5", "A7", "e-tron GT", "RS e-tron GT", "S3", "S4", "S5 Sportback", "S6", "S7", "S8", "RS5", "RS6 Avant", "TT", "R8", "A2", "100 Coupe S", "V8", "RS2 Avant", "Quattro"],
      "Morris": ["Minor", "Marina", "Oxford", "Cowley", "Six", "Isis", "Major", "Ten", "Eight", "Fourteen", "Twelve", "Twenty-One", "Mini", "Mini Cooper", "1100", "1300", "1500", "1700", "1800", "2200", "Nomad", "Ital", "Marshal", "Mascot", "Metro", "Monaco", "Princess"],
      "Austin": ["Cambridge", "Mini", "Allegro", "7 hp", "10 hp", "15 hp", "18-24 hp", "20 hp", "25-30 hp", "30 hp", "40 hp", "50 hp", "60 hp", "Twenty", "Twelve", "Seven", "Ten", "Eight", "Fourteen", "Sixteen", "Eighteen", "Twenty-Eight", "A30", "A35", "A40 Devon", "A40 Dorset", "A40 Somerset", "A40 Farina", "A40 Sports", "A50 Cambridge", "A55 Cambridge", "A60 Cambridge", "A70 Hampshire", "A70 Hereford", "A90 Atlantic", "A90 Westminster", "A95 Westminster", "A99 Westminster", "A105 Westminster", "A110 Westminster", "A125 Sheerline", "A135 Princess", "1100/1300", "1800/2200", "3-Litre", "America", "Ant", "Apache", "Metropolitan", "Maxi", "Metro", "Maestro", "Montego", "Ambassador", "Marina", "Sprite", "Kimberley", "Tasman", "Lancer", "Freeway"],
      "Proton": ["Saga", "Wira", "Preve", "Iriz", "Persona", "Satria", "Putra", "Perdana", "Tiara", "Waja", "GEN-2", "Satria Neo", "Savvy", "Inspira", "Suprima S", "S70", "eMas 5"],
      "Volkswagen": ["Beetle", "Golf", "Jetta", "Polo", "Passat", "Vento", "Arteon", "Virtus", "Magotan", "Lavida", "ID.3", "Dasher", "Quantum", "Fox", "Corrado", "Eos", "Phaeton", "Scirocco", "Lupo", "Bora", "up!", "XL1", "Golf SportWagen", "Golf Alltrack", "Karmann Ghia", "e-Golf"],
      "Volvo": ["S40", "S60", "S80", "240", "740", "940", "S90", "V60 Cross Country", "V90 Cross Country", "140 series", "140 series 142", "140 series 144", "140 series 145", "164", "260 series", "260 series 262C", "260 series 264", "260 series 265", "340 series", "340 series 343", "340 series 345", "360", "440/460", "480", "760", "780", "850", "960", "C30", "C70", "S70", "V40", "V50", "V70", "V90"],
      "Zotye": ["Z100", "Z300", "E20 EV", "E30 EV", "E200 EV", "E300 EV", "Z200", "Z200HB", "Z360", "Z500", "Z560", "Z700", "M300", "SR7", "SR9", "V10", "JN Auto/TT", "A16", "B21", "Cloud 100"],
      "MG": ["3", "5", "6", "4 EV", "Comet EV", "GT", "7", "IM5", "8 PHEV", "Cyberster", "M-type Midget", "J-type Midget", "P-type Midget", "T-type Midget", "MGA", "Midget", "MGB", "MGC", "RV8", "F / TF", "14/28", "18/80", "F-type Magna", "K-type Magnette", "L-type Magna", "N-type Magnette", "SA", "VA", "WA", "Y-type", "Magnette", "1100/1300 Saloon", "Metro", "Maestro", "Montego", "ZR", "ZT", "350", "360", "550", "750", "E50 / Dynamo EV", "XPower SV"],
      "Chery": ["QQ", "Arrizo 3", "Arrizo 5", "Arrizo 5 Plus", "Arrizo 6", "Arrizo 7", "Arrizo 8", "Arrizo M7", "O5", "Fulwin 2", "E3", "E5", "QQ Ice Cream", "QQ3", "QQ6", "QQme", "eQ1", "eQ5", "eQ7", "Arrizo 5e", "Riich M1 EV"],
      "FAW": ["V2", "Vita", "Vela", "Oley", "Weizhi V2"],
      "Hongqi": ["Guoli/L5", "Guoya/L1", "H9", "H6", "H5", "EH7", "Tiangong 05/EH5", "E-QM5"],
      "Bestune": ["B70", "B50", "B90", "B30", "Pony"],
      "Junpai": ["A50", "A70"],
      "Xiali": [],
      "Dongfeng": ["CA71"],
      "BYD": ["Seal", "Seal U", "Dolphin", "Atto 3", "Han", "Han EV", "Tang", "Tang EV", "Qin", "Qin Plus", "Qin Pro", "Song", "Song Plus", "Song Pro", "Song L", "Song Max", "Yuan", "Yuan Plus", "Yuan Pro", "Seagull", "Sea Lion 06", "Sea Lion 07", "Shark", "Destroyer 05", "Frigate 07", "Corvette 07", "Denza D9", "Denza N7", "Denza N8", "Yangwang U8", "Yangwang U9", "Sealion 6", "Sealion 7", "e2", "e6", "F3", "BYD Blade"],
      "NIO": ["ET5", "ET7", "ES6", "ES8", "EC6", "EC7", "EL6", "EL7", "EL8"],
      "XPeng": ["P5", "P7", "P7+", "G3", "G6", "G9", "X9", "Mona M03"],
      "Li Auto": ["L6", "L7", "L8", "L9", "Mega"],
      "Geely": ["Emgrand", "Borui", "Binrui", "Preface", "Xingrui", "Galaxy E5", "Galaxy E8", "Galaxy L6", "Galaxy L7"],
      "Jaguar": ["XE", "XF", "XJ", "F-Type", "I-Pace"],
      "Porsche": ["911", "Taycan", "Panamera", "718 Boxster", "718 Cayman"],
      "Ferrari": ["Roma", "Portofino M", "296 GTB", "SF90 Stradale", "F8 Tributo", "812 Superfast", "Purosangue"],
      "Lamborghini": ["Huracan", "Urus", "Revuelto", "Temerario"],
      "Maserati": ["Ghibli", "Quattroporte", "GranTurismo", "MC20", "GranCabrio"],
      "Bentley": ["Continental GT", "Flying Spur", "Bentayga"],
      "Rolls-Royce": ["Ghost", "Phantom", "Spectre", "Cullinan"],
      "Aston Martin": ["Vantage", "DB12", "DBS", "DBX", "Valkyrie"],
      "McLaren": ["Artura", "750S", "720S", "GT", "765LT"],
      "Lotus": ["Emira", "Eletre", "Emeya", "Evija"],
      "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck", "Roadster"],
      "Rivian": ["R1T", "R1S", "R2", "R3", "R3X"],
      "Lucid": ["Air", "Air Pure", "Air Touring", "Air Grand Touring", "Gravity"],
      "Polestar": ["2", "3", "4", "5", "6"],
      "Fisker": ["Ocean", "Pear", "Alaska", "Ronin"],
      "VinFast": ["VF 3", "VF 5", "VF 6", "VF 7", "VF 8", "VF 9", "VF e34"],
      "Zeekr": ["001", "007", "009", "X", "Mix"],
      "Leapmotor": ["C01", "C10", "C11", "C16", "T03", "S01"],
      "Smart": ["#1", "#3", "#5", "EQ fortwo", "EQ forfour"],
      "Ora": ["Good Cat", "Funky Cat", "Ballet Cat", "Lightning Cat", "03"],
      "Neta": ["V", "U", "S", "GT", "X", "L"],
      "Aiways": ["U5", "U6"],
      "Skywell": ["ET5", "BE11"],
      "BAIC": ["EU5", "EU7", "EX3", "EX5", "Arcfox Alpha S", "Arcfox Alpha T"],
      "GAC Aion": ["S", "S Plus", "V", "Y", "Y Plus", "LX", "LX Plus", "Hyper GT", "Hyper SSR"],
      "Seres": ["3", "5", "7", "E1"],
      "Weltmeister": ["EX5", "EX6", "W6", "M7"],
      "IM Motors": ["L7", "LS7", "L6"],
      "Jiyue": ["01", "07"],
      "Avatr": ["11", "12", "07"],
      "Deepal": ["S07", "L07", "G318"],
      "Yangwang": ["U8", "U9"],
      "Denza": ["D9", "N7", "N8"],
      "HiPhi": ["X", "Y", "Z"],
      "Faraday Future": ["FF 91"],
      "Canoo": ["Lifestyle Vehicle", "Pickup", "MPDV"],
      "Lordstown": ["Endurance"],
      "Bollinger": ["B1", "B2", "B4"],
      "Aptera": ["Launch Edition", "Accelerator", "Paradigm"],
      "Sono": ["Sion"],
      "ElectraMeccanica": ["Solo"],
      "Kandi": ["K27", "K23"],
      "Mullen": ["Five", "Three"],
      "Karma": ["GS-6", "GSe-6", "Revero"],
      "Byton": ["M-Byte"]
    },
    "SUVs": {
      "Toyota": ["Land Cruiser", "Prado", "RAV4", "Rush", "Fortuner", "C-HR", "Harrier", "Kluger", "Highlander", "Grand Highlander", "4Runner", "Sequoia", "Corolla Cross", "Venza", "bZ4X", "Urban Cruiser Hyryder", "Urban Cruiser Taisor", "Land Cruiser 300", "Land Cruiser 70", "Wildlander", "Yaris Cross", "Frontlander"],
      "Mitsubishi": ["Pajero", "Montero", "Outlander", "ASX", "Shogun", "iO", "Outlander Sport", "RVR", "Eclipse Cross", "Xforce", "Destinator", "Grandis", "Pajero Mini", "Endeavor"],
      "Honda": ["CR-V", "HR-V", "Vezel", "BR-V", "Passport", "Pilot", "Prologue", "Avancier", "Elevate", "e:NS1/e:NP1/e:Ny1/e:N1", "e:NS2/e:NP2", "Ye P7/Ye S7", "ZR-V", "Element", "Stream", "FR-V", "Mobilio"],
      "Nissan": ["X-Trail", "Patrol", "Murano", "Terrano", "Pathfinder", "Juke", "Ariya", "Kicks", "Magnite", "Armada", "Qashqai", "Rogue Sport", "Rogue", "Terra", "X-Terra"],
      "Suzuki": ["Vitara", "Jimny", "Grand Vitara", "S-Cross", "Samurai", "Sidekick", "X90", "Across"],
      "Mahindra": ["KUV100", "XUV300", "XUV500", "Scorpio", "Bolero"],
      "Isuzu": ["MU-X", "Trooper", "Bighorn"],
      "Hyundai": ["Tucson", "Santa Fe", "Creta", "Kona", "Venue", "Kona Electric", "Kona N", "Exter", "Bayon", "Tucson Hybrid", "Tucson Plug-in Hybrid", "Santa Fe Hybrid", "Santa Fe Plug-in Hybrid", "Palisade", "Palisade Hybrid", "Alcazar", "Nexo", "Ioniq 5", "Ioniq 5 N", "Ioniq 9", "INSTER", "Casper"],
      "Kia": ["Sportage", "Sorento", "Stonic", "Niro", "Carnival MPV", "Carens", "Seltos", "Sonet", "Soul", "Syros", "Telluride", "Borrego", "Rondo", "EV3", "EV5", "EV6", "EV9", "Sportage Hybrid", "Sorento Hybrid", "Carnival MPV Hybrid"],
      "Ford": ["Ecosport", "Everest", "Escape", "Explorer", "Bronco", "Bronco Sport", "Kuga", "Expedition", "Mustang Mach-E", "Puma", "Edge", "Equator", "Capri EV", "Territory"],
      "Mercedes-Benz": ["G-Class", "GLE", "GLC", "ML", "GLK", "GLA", "GLB", "GLS", "Maybach GLS", "EQA", "EQB", "EQE SUV", "EQS SUV", "Maybach EQS SUV"],
      "BMW": ["X1", "X3", "X5", "X6", "X2", "X4", "X7", "iX", "iX1", "iX2", "iX3", "X3 M", "X4 M", "X5 M", "X6 M", "XM"],
      "Audi": ["Q3", "Q5", "Q7", "Q2", "Q3 Sportback", "Q8", "Q4 e-tron", "Q5 e-tron", "Q8 e-tron", "Q8 Sportback e-tron", "SQ5", "SQ7", "SQ8", "RS Q8", "Q6 e-tron", "SQ6 e-tron"],
      "Range-Rover": ["Evoque", "Sport", "Vogue", "Velar", "Discovery"],
      "Jeep": ["Wrangler", "Cherokee", "Grand Cherokee", "Compass", "Renegade"],
      "Subaru": ["Forester", "XV", "Outback"],
      "Mazda": ["CX-3", "CX-5", "CX-9", "CX-30"],
      "Haval": ["H2", "H6", "Jolion"],
      "MG": ["ZS", "HS", "GS", "S5 EV", "One", "Hector", "Gloster", "QS", "IM6"],
      "DFSK": ["Glory 580", "Glory i-Auto"],
      "Peugeot": ["3008", "5008", "2008", "e-2008", "e-3008", "4008", "e-5008", "4007"],
      "Volkswagen": ["Tiguan", "Touareg", "Atlas", "Atlas Cross Sport", "Taos", "T-Cross", "Taigo", "T-Roc", "Tayron", "ID.4", "ID.5", "Tiguan Allspace"],
      "Porsche": ["Cayenne", "Macan"],
      "Tata": ["Punch", "Nexon", "Harrier", "Safari", "Sierra", "Curvv", "Nexon EV", "Punch EV", "Harrier EV", "Curvv EV", "Sierra EV", "Safari EV"],
      "Micro": ["Actyon", "Kyron", "Tivoli", "Almaz"],
      "Daihatsu": ["Rocky", "Terios", "Feroza", "Fourtrak", "Rugger", "Scat", "Sportrak", "Taruna", "Terios Kid", "Wildcat"],
      "Perodua": ["Ativa", "Aruz", "Kembara", "Nautica", "Traz", "Nexis"],
      "Renault": ["4 E-Tech", "Arkana", "Austral", "Boreal", "Captur", "Duster", "Kiger", "Rafale", "Symbioz", "Kadjar", "Koleos"],
      "Austin": ["Gipsy", "Champ"],
      "Proton": ["X70", "X50", "X90", "eMas 7"],
      "Volvo": ["EX30", "EX40", "EX90", "XC40", "XC60", "XC90", "C40 Recharge Pure Electric", "XC70"],
      "Zotye": ["T200", "T300", "T500", "T600", "T700", "T800", "Traum S70", "Traum MEET3", "Traum MEET5", "Traum SEEK5", "Domy X5", "Domy X7", "2008 / 5008", "2008 / 5008 Nomad/Hunter", "Coupa"],
      "Chery": ["Tiggo 1X", "Tiggo 2", "Tiggo 3", "Tiggo 3x", "Tiggo 4", "Tiggo 5", "Tiggo 5x", "Tiggo 7", "Tiggo 8", "Tiggo 9", "Omoda 5", "Omoda 3", "Tansuo 06", "V23"],
      "Exeed": ["VX", "TX / TXL", "LX"],
      "Jetour": ["X70", "X90", "Dashing"],
      "Jaecoo": ["J7", "J8"],
      "iCar": ["03"],
      "Hongqi": ["Guoyao/LS7", "HS9", "HS7", "HS6", "HS5", "HS3", "E-HS9", "Tiangong 08/EHS7", "Tiangong 06/EHS5"],
      "Bestune": ["T90", "Yueyi 03", "Yueyi 07", "B70S", "T55", "T77", "T99", "X80", "X40", "T33", "E01"],
      "Junpai": ["D60", "D80"],
      "Senya": ["S80"]
    },
    "Vans": {
      "Toyota": ["Hiace", "Hiace KDH", "Hiace LH", "Townace", "Liteace", "Dolphin", "Regius", "Granvia", "Noah", "Voxy", "Esquire", "Sienna", "Innova Hycross", "Alphard", "Vellfire", "Sienta", "Rumion", "Veloz", "Coaster"],
      "Nissan": ["Caravan", "Vanette", "Serena", "Elgrand", "AD", "Urvan", "Clipper van", "Interstar", "NV200", "Primastar", "Townstar", "Townstar EV", "Clipper EV", "Interstar-e"],
      "Suzuki": ["Every", "Carry", "Bolan", "APV", "Every Plus/Landy", "Karimun", "Solio", "Landry"],
      "Mitsubishi": ["Delica", "L300", "L400", "Minicab", "Minicab EV/L100", "Zinger", "Chariot", "Grandis"],
      "Daihatsu": ["Hijet", "Gran Max", "Extol", "Citivan"],
      "Mazda": ["Bongo", "Bongo Brawny"],
      "Isuzu": ["Fargo", "Como"],
      "Ford": ["Transit", "Tourneo", "E-Transit", "Transit Connect", "Transit Courier", "Transit Custom"],
      "Mercedes-Benz": ["Vito", "V-Class", "Sprinter", "Metris"],
      "Joylong": ["Hiace", "A-series"],
      "Foton": ["View", "Toano"],
      "Hyundai": ["H-1", "Starex", "Grace", "Staria", "Custo"],
      "Kia": ["Pregio", "K2700", "Carnival MPV"],
      "FAW": ["Carrier", "X-PV"],
      "Hongqi": ["HQ9", "Guoyue/QM7", "Guoyue/QM7 Minibus"],
      "Bestune": ["NAT", "NAT E05", "M9"],
      "Jiabao": ["CA6350", "V52", "T50", "T57", "V55", "V70", "V75", "V77", "V80"],
      "Senya": ["M80"],
      "Honda": ["Odyssey", "Acty"],
      "Perodua": ["Rusa"],
      "Renault": ["Espace", "Kangoo", "Scenic E-Tech", "Trafic Passenger", "Lodgy"],
      "Peugeot": ["Partner", "e-Partner", "Expert", "e-Expert", "Boxer", "e-Boxer", "Traveller", "e-Traveller", "Rifter", "e-Rifter", "Bipper", "Bipper Tepee", "Expert Tepee"],
      "Proton": ["Exora", "Juara", "Ertiga"],
      "Volkswagen": ["Caddy", "Multivan", "California", "Grand California", "ID. Buzz", "Routan", "Eurovan", "Type 2 Bus/Microbus"],
      "MG": ["V80"]
    },
    "Motorbikes": {
      "Bajaj": ["Pulsar", "Pulsar 135", "Pulsar 150", "Pulsar 160", "Pulsar 180", "Pulsar 200", "Pulsar 220", "Pulsar N125", "Pulsar N150", "Pulsar N160", "Pulsar N250", "Pulsar NS125", "Pulsar NS160", "Pulsar NS200", "Pulsar NS400Z", "Pulsar RS200", "Discover", "Discover 100", "Discover 125", "Discover 135", "Discover 150", "Discover 100M", "Discover 100T", "Discover 125M", "Platina", "CT 100", "Dominar 400", "Avenger", "Dominar 250", "Avenger Cruise 220", "Avenger Street 160", "Platina 110", "CT110X", "Chetak", "Freedom 125 CNG", "Bajaj Kawasaki 4S Champion", "Bajaj Kawasaki Boxer", "Bajaj Kawasaki Caliber", "Bajaj Kawasaki Eliminator 175", "Bajaj Kawasaki KB100", "KB125", "Bajaj Kawasaki Wind 125", "V12", "V15", "XCD"],
      "TVS": ["Apache", "Apache RTR 150", "Apache 160", "Apache 180", "Apache 200", "Apache RTR 160 4V", "Apache RTR 310", "Apache RR 310", "Apache RTX 300", "Metro", "Ntorq", "XL 100", "Scooty Pep", "Jupiter", "Wego", "Star City", "Phoenix", "Ronin", "Raider", "Radeon", "Sport", "Star City+", "Neo XR 125", "MAX 125 Semi Trail", "Rockz 125", "Dazz 110", "Max 4R 125", "Centra", "Fiero", "Flame", "Jive", "RTR 165", "RTR 450", "Super", "Victor", "NTorq 125", "NTorq 150", "Jupiter 125", "Zest 110", "Streak", "Vego", "iQube", "iQube Electric", "X", "X Electric", "Orbiter", "Orbiter Electric", "50"],
      "Honda": ["Dio", "Activa", "Grazia", "Hornet", "Unicorn", "CD 90", "CB Twister", "Navi", "Shine", "Livo", "X-Blade", "CBR", "CBR 150", "CBR 250", "CBR 500R", "CBR 600RR", "CBR 1000RR Fireblade", "CRF", "CRF 150L", "CRF 250R", "CRF 300L", "CRF 450R", "CRF 1100L Africa Twin", "A-Type", "Dream D-Type", "Dream E", "Super Cub", "Super Cub C100/C102", "CB77", "CB77 Super Hawk", "CB750", "CB series", "CB series CB300R", "CB series CB500", "CB series CB650R", "CB series CB1000", "Gold Wing", "Gold Wing GL series", "Rebel series", "Rebel series Rebel 500", "Rebel series Rebel 1100", "XR/XL series", "XR/XL series XR150L", "XR/XL series XR650L", "ADV series", "ADV series ADV 160", "ADV series ADV350", "PCX series", "BeAT", "Giorno", "Grom", "Monkey", "Transalp XL750", "Africa Twin", "EM1 e", "EM1 e Electric", "PCX Electric", "PCX Electric Electric"],
      "Hero": ["Splendor", "Passion", "Glamour", "Maestro", "Pleasure", "HF Deluxe", "Xtreme", "Hunk", "Karizma", "Destini", "Duet", "Splendor Plus", "Splendor Plus Xtec", "Splendor Plus Xtec 2.0", "Splendor Super Splendor Xtec", "HF 100", "HF Deluxe Pro", "Passion Plus", "Glamour Xtec", "Glamour X 125", "XPulse 200 4V", "XPulse 210", "Xtreme 160R", "Xtreme 160R 4V", "Xtreme 125R", "Xtreme 250R", "Karizma XMR", "Mavrick 440", "Harley-Davidson X440", "Xoom 110", "Xoom 125", "Xoom 160", "Vida V2 Plus", "Vida V2", "VX2", "VX2 Electric", "Passion Xpro", "Passion Pro 110", "Passion Xtec", "HF Dawn", "HF Deluxe Eco", "Maestro Edge 110", "Maestro Edge 125", "Ignitor", "Xtreme 150", "Xtreme Sports", "Xtreme 200R", "Xtreme 200S", "Impulse", "Xpulse 200T", "Super Splendor", "Achiever", "Ambition", "CBZ", "CBZ Xtreme", "Sleek", "Street", "CD100", "CD100SS", "CD Dawn", "CD Deluxe", "Joy"],
      "Yamaha": ["FZ", "FZ V1", "FZ V2", "FZ V3", "FZ FZ-S FI", "FZ FZ-X", "R15", "R15 V1", "R15 V2", "R15 V3", "YZF-R", "YZF-R R1M", "YZF-R R1", "YZF-R R9", "YZF-R R7", "YZF-R R3", "MT-15", "MT series", "MT series MT-10 SP", "MT series MT-10", "MT series MT-09 SP", "MT series MT-09", "MT series MT-07", "MT series MT-03", "Ray", "Fascino", "Saluto", "SZ-R", "Enticer", "Libero", "Crux", "XSR700", "XSR900", "FJR1300", "Tracer 9 GT", "Super Tenere ES", "Bolt R-SPEC", "V Star", "Road Star", "YBR125", "YZ series", "YZ series YZ450F", "YZ series YZ250F", "YZ series YZ250", "YZ series YZ125", "YZ series YZ85", "YZ series YZ65", "WR series", "WR series WR450F", "WR series WR250F", "TT-R series", "TT-R series TT-R230", "TT-R series TT-R125LE", "TT-R series TT-R110E", "TT-R series TT-R50E", "PW50", "WR 155R", "Tenere 700", "Mio series", "Mio series Mio Gravis", "Mio series Mio i125", "Mio series Mio Aerox", "NMAX", "XMAX", "TMAX", "YA-1", "DT-1", "XS-1"],
      "Suzuki": ["Gixxer", "Access", "Burgman Street", "Intruder", "Hayate", "Zeus", "Slingshot", "GSX-R series", "GSX-R series GSX-R600", "GSX-R series GSX-R750", "GSX-R series GSX-R1000", "GSX-R series GSX-R1100", "GSX-R series GSX-R125", "Hayabusa", "Hayabusa GSX1300R", "GSX series", "GSX series GSX250R", "GSX series GSX650F", "GSX series GSX1100F", "GSX series GSX1400", "GSX-S series", "GSX-S series GSX-S750", "GSX-S series GSX-S1000", "GSX-S series GSX-S1000GT+", "GSX-S series GSX-8S", "GSX-S series GSX-8R", "Katana", "SV series", "SV series SV650", "SV series SV1000", "Bandit series", "B-King", "TL1000S", "V-Strom series", "V-Strom series V-Strom 650", "V-Strom series V-Strom 800", "V-Strom series V-Strom 1050", "V-Strom series V-Strom SX", "DR series", "DR series DR125", "DR series DR200SE", "DR series DR350", "DR series DR650", "DR series DR800S", "DR series DR-Z400", "DR series DR-Z125L", "DR series DR-Z50", "XF 650 Freewind", "Boulevard series", "Boulevard series C50", "Boulevard series C90", "Boulevard series C109R", "Boulevard series M50", "Boulevard series M109R", "Boulevard series S40", "Boulevard series S50", "Boulevard series S83", "Marauder", "Marauder VZ800", "Madura series", "Burgman series", "Burgman series Burgman 200", "Burgman series Burgman 400", "Burgman series Burg-man 650", "Access 125", "Avenis 125", "Skydrive 125", "Smash", "Raider series", "Raider series Raider J", "Raider series Raider R150", "Raider series Raider R150 Fi", "Raider series Raider J Crossover", "Let's", "Choinori", "Gemma", "Sixteen", "RM series", "RM series RM85", "RM series RM125", "RM series RM250", "RM series RM-Z250", "RM series RM-Z450", "PE series", "JR50", "GN series", "GN series GN250", "GR650", "GT series", "GT series GT250", "GT series GT550", "GT series GT750", "GW250", "GZ series", "ST250", "TU series", "VanVan", "Colleda", "Power Free"],
      "Demak": ["D-Force", "D-Tour", "Evo", "ATM 200", "Combat", "Cougar", "DART DXT 250", "DJ-90", "DMS", "DMX-R", "DTM 150", "DTM 200", "Duta", "DV 110", "DVS 110", "DX 90", "DX250 Dart", "DZM 200", "DZR 120", "ECO 110", "Evo Z", "EVO Z 125R", "EVO ZR", "Ex 90", "Explorer 150", "Matrix Sport Z", "MS", "MV", "MV 110", "MV 135", "Piranha", "Rino S", "SKYBORN 150cc", "SKYLINE 200", "SKYLINE-GT", "Smart MTR", "Smart MTX", "Smart Z", "Spark", "Spark RUV", "Spark Sidecar", "Sprinter 125", "TRANSTAR", "Transtar 125F", "Transtar 150", "Tropica 125cc", "WARRIOR"],
      "KTM": ["Duke", "Duke 125", "Duke 200", "Duke 250", "Duke 390", "Duke 160", "Duke 690", "Duke 790", "Duke 890", "Duke 990", "Duke 1290 Super Duke", "Duke 1390 Super Duke", "RC", "RC 125", "RC 200", "RC 390", "RC 250", "RC 8", "RC 990", "Adventure series", "Adventure series 620", "Adventure series 640", "Adventure series 950", "Adventure series 990", "Adventure series 1050", "Adventure series 1090", "Adventure series 1190", "Adventure series 1290 Super Adventure", "Adventure series 390 Adventure", "Adventure series 790 Adventure", "Adventure series 890 Adventure", "EXC series", "EXC series 125", "EXC series 250", "EXC series 300", "EXC series 450", "EXC series 500", "EXC series 350", "EXC series 530", "EXC series Six Days", "SX series", "SX series 50", "SX series 65", "SX series 85", "SX series 125", "SX series 150", "SX series 250", "SX series 300", "SX series 250 SX-F", "SX series 350 SX-F", "SX series 450 SX-F", "SX series SX-E 2", "SX series SX-E 3", "SX series SX-E 5", "XC series", "XC series 125", "XC series 250", "XC series 300", "XC series 250 XC-F", "XC series 350 XC-F", "XC series 450 XC-F", "XC series 150 XC-W", "XC series 250 XC-W", "XC series 300 XC-W", "SMC series", "SMC series 690 SMC", "SMC series 690 SMC-R", "690 Enduro R", "Freeride E-XC", "Freeride E-XC Electric", "Brabus 1400 R"],
      "Royal Enfield": ["Classic 350", "Bullet 350", "Himalayan", "Interceptor 650", "Continental GT 650", "Thunderbird", "Hunter 350", "Meteor 350", "Goan Classic 350", "Guerrilla 450", "Scram 411", "Super Meteor 650", "Shotgun 650", "Bear 650", "Classic 650", "Bullet 500", "Classic 500", "Thunderbird 500", "Thunderbird X 500", "Bullet Trials 350", "500", "Electra", "Sherpa", "Crusader"],
      "Kawasaki": ["Ninja", "Ninja 250", "Ninja 300", "Ninja 400", "Ninja 650", "Ninja ZX-14R", "Ninja ZX-10R", "Ninja ZX-6R", "Ninja ZX-4RR", "Ninja ZX-4R", "Ninja 1100SX", "Ninja 500", "Ninja H2", "Ninja e-1", "Ninja 7 Hybrid", "Z series", "Z series Z250", "Z series Z300", "Z series Z650", "Z series Z800", "Z series Z900", "Z series H2", "Z series Z900RS", "Z series Z900RS Cafe", "Z series Z900 SE", "Z series Z500", "Z series Z125 Pro", "Z series e-1", "KLX", "KLX 300", "KLX 300R", "KLX 250S", "KLX 230", "KLX 230R", "KLX 230S", "KLX 150S", "KLX 140", "KLX 140R", "KLX 140R L", "KLX 140R F", "KLX 110", "KLX 110R", "KLX 110R L", "Vulcan series", "Vulcan series 2000", "Vulcan series 1700", "Vulcan series 1600", "Vulcan series 900", "Vulcan series S 650", "Vulcan series 500 LTD", "KLR series", "KLR series 650", "Versys series", "Versys series 1000", "Versys series 650", "Eliminator series", "Eliminator series 500", "Eliminator series 125", "W series", "W series W800", "W series Cafe", "KX series", "KX series 450", "KX series 250", "KX series 112", "KX series 85", "KX series 65", "KLE series", "KLE series 500", "ER series", "ER series ER-5", "ER series ER-6f", "ER series ER-6n", "GTO 125", "KSR110", "Barako", "Estrella", "Super Sherpa", "H1 Mach III 500", "H2 Mach IV 750"],
      "Harley-Davidson": ["Street 750", "Iron 883", "Forty-Eight", "Grand American Touring", "Grand American Touring Road Glide", "Grand American Touring Street Glide", "Grand American Touring Road King Special", "Grand American Touring Road Glide Limited", "Grand American Touring Street Glide Limited", "Grand American Touring Ultra Limited", "Cruiser", "Cruiser Fat Boy", "Cruiser Heritage Classic", "Cruiser Low Rider S", "Cruiser Low Rider ST", "Cruiser Street Bob", "Cruiser Breakout", "Sport", "Sport Nightster", "Sport Nightster Special", "Sport Sportster S", "Adventure Touring", "Adventure Touring Pan America 1250 Special", "Adventure Touring Pan America 1250 ST", "Trike", "Trike Freewheeler", "Trike Tri Glide Ultra", "Trike Road Glide 3", "CVO", "CVO CVO Road Glide", "CVO CVO Street Glide", "CVO CVO Road Glide ST", "CVO CVO Pan America", "Electric", "Electric LiveWire One", "Dyna Family", "Dyna Family Dyna Wide Glide", "Dyna Family Dyna Switchback", "V-Rod Family", "Sportster Iron 1200", "Street 500", "Street Rod", "Softail Deluxe", "FXDR 114", "Electra Glide Standard", "Roadster", "Sport Glide", "WLA", "Hummer/American Lightweight", "Model W", "45", "K-series", "Panhead", "Aermacchi-Harley-Davidsons", "FX/FXR/FXD/FLD/Dyna"],
      "Ducati": ["Diavel", "Monster", "Scrambler", "Panigale", "Streetfighter", "Streetfighter V4", "Streetfighter V2", "Multistrada", "Multistrada V4", "Multistrada V4 RS", "Multistrada V2", "Hypermotard", "Hypermotard 950", "Hypermotard 698 Mono", "DesertX", "SuperSport", "Cucciolo", "Ducati 60", "Desmoquattro series", "Desmoquattro series 851", "Desmoquattro series 916", "Desmoquattro series 996", "Desmoquattro series 999", "Paso", "Monster Dark", "Desmosedici RR", "SportClassic", "SportClassic GT1000", "SportClassic GT1000 Touring", "SportClassic Sport 1000S"],
      "BMW Motorrad": ["G310R", "G310GS", "S1000RR", "R Series", "R Series R1300GS", "R Series R1300GS Adventure", "R Series R1300R", "R Series R1300RS", "R Series R1300RT", "R Series R 12", "R Series R 12 NineT", "R Series R 12 S", "R Series R 12 G/S", "R Series R18", "R Series R 80 G/S", "K Series", "K Series K1600B", "K Series K1600 Grand America", "K Series K1600GT", "K Series K1600GTL", "K Series K100", "K Series K1", "K Series K75", "F Series", "F Series F 900 GS", "F Series F 900 GS Adventure", "F Series F 800 GS", "F Series F 900 XR", "F Series F 650 Funduro", "G Series", "G Series G 310 RR", "S Series", "S Series S1000R", "S Series S1000XR", "M Series", "M Series M 1000 R", "M Series M 1000 RR", "M Series M 1000 XR", "C Series", "C Series C 400 GT", "C Series C 400 X", "CE Series", "CE Series CE 02", "CE Series CE 04"],
      "Singer": ["City-Rider", "Turbo", "Safari", "Camy 80", "Lima", "TAILG F71", "TAILG F71 Electric", "TAILG F55", "TAILG F55 Electric", "TAILG F72", "TAILG F72 Electric"],
      "Aprilia": ["SR 150", "RS series", "RSV4", "Tuono V4", "RS 660", "Tuono 660", "Tuareg 660", "RS 457", "Tuono 457", "RS 125", "Tuono 125", "SX 125", "RX 125", "SR GT", "SXR", "SR", "Colibrì", "Daniela", "Packi", "Scarabeo", "ET 50", "RXV", "SXV", "MXV", "MX", "TL320", "Climber", "ST 125", "STX", "STX 125", "STX 350", "AF1", "Pegaso", "Pegaso 600", "Pegaso 650", "RS 250", "RSV Mille", "Falco", "RST Futura", "ETV 1000 Caponord", "Dorsoduro", "Dorsoduro 750", "Dorsoduro 900", "Dorsoduro 1200", "Shiver", "Shiver 750", "Shiver 900", "Moto 6.5", "Blue Marlin 1000", "Classic", "Classic 125", "Classic 50", "Atlantic", "Leonardo", "SRV", "Sportcity", "Mojito", "SR Max 300", "SR Motard", "SR Motard 125", "SR Motard 50"],
      "Vespa": ["LX", "VXL", "SXL", "98", "125", "150", "50", "90", "100", "Primavera", "ET3 Primavera", "180 & 200 Rally", "PX", "T5", "Cosa", "ET", "GTS", "GTV", "Sprint", "946", "Elettrica", "Sei Giorni"]
    },
    "Lorries": {
      "Isuzu": ["Elf", "Elf NKR", "Elf NPR", "Elf NQR", "Forward", "Forward FTR", "Forward FVR", "Forward FSR"],
      "Mitsubishi": ["Fuso", "Canter", "Canter FB", "Canter FE", "Canter FG"],
      "Tata": ["Ace", "Super Ace", "LPK", "LPT", "SFC", "Ultra", "Signa"],
      "Ashok-Leyland": ["Dost", "Comet", "Ecomet", "Captain"],
      "Mahindra": ["Bolero Maxi Truck", "Maxximo", "Furio", "Blazo"],
      "Eicher": ["Pro series", "Pro series 1000", "Pro series 2000", "Pro series 3000", "Pro series 6000"],
      "JAC": ["N-Series", "Gallop"],
      "Foton": ["Aumark", "Auman"],
      "Mazda": ["Titan", "T-Series"],
      "Toyota": ["Dyna", "Toyoace"],
      "Nissan": ["Atlas", "Cabstar", "Clipper truck"],
      "Hino": ["Dutro", "Ranger", "Profia"],
      "Micro": ["Loader", "Unimo"],
      "FAW": ["FAW Trucks"]
    },
    "Three Wheel": {
      "Bajaj": ["RE", "Maxima", "Compact", "RE Optima", "RE E-TEC 9.0", "Maxima Z", "Maxima X Wide", "Maxima C", "Maxima XL Cargo E-TEC 12.0", "Maxima Cargo E-TEC 9.0", "GoGo", "GoGo P7012", "GoGo P5009", "GoGo P5012", "Riki P40", "Riki C40", "FE Pickup", "Qute", "Qute four-wheel"],
      "TVS": ["King", "King Duramax", "King EV MAX", "King EV MAX Electric", "King Deluxe", "King Duramax Plus", "King EP1", "King EP1 Electric", "King Kargo HD EV", "King Kargo HD EV Electric", "King Kargo", "Kargo"],
      "Piaggio": ["Ape", "Ape City", "Ape Xtra", "Ape Xtra LDX", "DX", "DXL", "Plus", "HT", "HD", "Classic", "Ape City Plus", "Ape E City", "E Xtra", "E Xtra Electric", "Ape NXT+", "Ape Auto", "Ape Classic", "Ape TM", "Porter"],
      "Mahindra": ["Alfa", "Treo", "Treo Plus", "Treo Yaari", "Treo Zor", "Treo Limited Edition", "E-Alfa Plus", "E-Alfa Cargo", "E-Alfa Mini", "E-Alfa Super", "Zor Grand", "Alfa DX", "Alfa Plus", "Alfa Load", "Alfa Passenger Comfy"],
      "Atul": ["Shakti", "Gem", "Elite Paxx", "Rik", "Elite Plus", "Elite Cargo", "Gem Cargo", "Energie", "Smart", "Gemini +"],
      "Greaves": ["Garuda", "Eltra Series", "Eltra Series EV Cargo PU", "Eltra Series EV Cargo DV", "Eltra Series EV Cargo FB", "Eltra Series City", "Eltra Series City Xtra", "Xargo EV", "E-Pro Cargo", "E-Loader", "ELC 3 Wheeler", "Mitra", "D435 Series", "D435 Series Cargo", "D435 Series City", "D599+ Series", "D599+ Series Cargo", "D599+ Series City", "C399 Series", "C399 Series Cargo", "C399 Series City"],
      "Daihatsu": ["Midget"]
    },
    "Pickups": {
      "Toyota": ["Hilux", "Stout", "LN series", "Tacoma", "Tundra"],
      "Mitsubishi": ["L200", "Triton", "Strada", "Zinger Pickup"],
      "Nissan": ["Navara", "Frontier", "D21", "D22", "NP300", "Titan"],
      "Isuzu": ["D-Max", "KB", "TFR"],
      "Ford": ["Ranger", "Courier", "F-Series", "F-Series F-150", "F-Series F-250", "F-Series F-350", "F-Series F-450", "F-Series F-150 Lightning", "Maverick"],
      "Mazda": ["BT-50", "B-Series", "Proceed"],
      "Tata": ["Xenon", "207 DI"],
      "Mahindra": ["Scorpio Getaway", "Bolero Pik-Up"],
      "GWM": ["Wingle", "Steed"],
      "Foton": ["Tunland"],
      "SsangYong": ["Actyon Sports"],
      "Suzuki": ["Equator"],
      "Honda": ["Ridgeline"],
      "Micro": ["Actyon Double Cab"],
      "Daihatsu": ["Gran Max", "Delta", "Hi-Line", "Hi-Max", "New Line"],
      "Hyundai": ["Santa Cruz"],
      "Proton": ["Arena"],
      "MG": ["U9"],
      "Chery": ["Himla"]
    },
    "Heavy-Duty": {
      "Lanka Ashok Leyland": ["Trucks", "Buses", "Buses Viking", "Buses Cheetah", "Tusker Super", "Taurus 2518", "3518 Cargo", "1920 Truck", "4220", "Signa 2823.K", "VNR 640", "CT1618", "Tipper 2518", "1920 Tipper", "4825 Tipper", "Ecomet 1215 Tipper", "U 4819", "U 4923", "Comet Gold", "Ecomet 1012", "1212", "1214", "1015 HE", "1615 HE", "Partner 6 Tyre"],
      "Tata": ["Prima", "Signa", "Buses", "Buses Marcopolo", "Buses Starbus", "Novus", "Prima series", "Prima series 2825.K/.TK", "Prima series 3530.K", "Prima series 5038.S", "Prima series E.55S", "Prima series H.28 T", "Prima series 2830.K", "Prima series FL 5530.S", "Signa series", "Signa series 2823.K", "Signa series 3525.K/.TK", "Signa series 3523.TK", "Signa series 4225.TK", "Signa series 4925.T", "Signa series 4221.T", "Signa series 5530.S", "Signa series 1923.K", "Signa series 3718.TK", "Signa series 4825.T", "Signa series 4825.TK", "Signa series 3530.TK", "Signa series 5530.S", "Signa series 3125.T", "Signa series 4225.T", "Signa series 4018.S", "Signa series 1918.K", "LPT series", "LPT series 2818 Cowl", "LPT series 710", "LPT series 1816", "LPT series 1918", "LPT series 4830", "LPT series 1212", "LPT series 1109g", "LPT series 2821 Cowl", "LPT series 3521 Cowl", "Ultra series", "Ultra series T.6", "Ultra series T.14", "Ultra series 1918.T", "Ultra series T.7", "407 Gold SFC", "SFC 407", "SFC 709 EX", "4018 Trailer"],
      "Isuzu": ["Giga", "Journey Bus", "F-Series", "F-Series Forward", "FRR", "FSR", "FVR", "FTR", "FVZ", "FRD", "FSD", "Giga Max", "N-Series", "N-Series NRR", "N-Series NQR"],
      "Mitsubishi Fuso": ["Fighter", "Super Great", "Rosa Bus", "The Great", "FJ", "FO", "FZ", "TV"],
      "UD Nissan Diesel": ["Quester", "Croner", "Big Thumb", "C-series", "C-series Resona", "6TW series", "780-series", "CWA52/45 series", "CKA-T series", "Quon"],
      "Volvo": ["FH", "FM", "FMX", "B7R Bus", "B9R Bus", "FH16", "FE", "FL", "VNR", "VNX", "VHD", "VAH", "VNL Series", "VNL Series VNL", "VNL Series VNM", "Excavators", "Excavators EC480D", "Excavators EC210D", "Excavators EC200D", "Excavators EC230", "Excavators EC480E", "Excavators EW180E", "Wheel Loaders", "Wheel Loaders L60H", "Wheel Loaders L120H", "Wheel Loaders L350H", "Articulated Haulers", "Articulated Haulers A25G", "Articulated Haulers A45G", "Articulated Haulers A60H", "Compactors", "Motor Graders", "Pavers", "Demolition Equipment", "Pipelayers"],
      "Scania": ["P-series", "G-series", "R-series", "Touring Bus", "Marcopolo Bus", "S-series", "L-series", "XT Range", "Crewcab", "Electric Trucks", "Gas Trucks", "770S V8", "T-series", "4-series", "3-series", "2-series"],
      "MAN": ["TGS", "TGM", "TGA", "Lion's Coach Bus", "TGL", "TGX", "F2000 / FE", "M2000 evolution / ME", "L2000 / LE", "CLA series", "CLA series CLA 16.220", "CLA series CLA 49.280", "CLA series CLA 25.220 6x4", "CLA series CLA 31.300 EVO", "CLA series CLA 49.300 EVO", "CLA series CLA 25.300 EVO", "CLA series CLA 40.250 EVO", "CLA series CLA 16.250 EVO"],
      "DAF": ["XF", "CF", "LF", "XG", "XG+", "XD", "XB", "XDC", "XFC", "Electric", "Electric XD Electric", "Electric XF Electric", "Electric XB Electric"],
      "JCB": ["Backhoe loaders", "Backhoe loaders 1CX", "Backhoe loaders 2DX", "Backhoe loaders 3CX", "Backhoe loaders 4CX", "Backhoe loaders 5CX Series", "Excavators", "Excavators Mini", "Excavators Tracked", "Excavators Wheeled", "Telehandlers", "Telehandlers Loadalls", "Rollers", "Wheel Loaders", "Wheel Loaders Compact", "Wheel Loaders Mid-sized", "Wheel Loaders Large", "Skid Steer Loaders", "Dumpsters", "Industrial Forklifts", "Compactors", "Fastrac Tractors", "Articulated Booms", "Vibratory Tandem Rollers", "Teletruk"],
      "CAT": ["Excavators", "Bulldozers", "Graders", "Wheel Loaders", "Backhoe Loaders", "Mining Trucks", "Mining Trucks 797", "Mining Trucks 785", "Mining Trucks 789", "Mining Trucks 793 series", "Dozers", "Dozers D-series", "Articulated Trucks", "Compactors", "Cold Planers", "Asphalt Pavers", "Telehandlers", "Pipelayers", "Wheel Tractor-Scrapers", "Military", "Military M520 Goer"],
      "Komatsu": ["Excavators", "Dozers", "Wheel Loaders", "Motor Graders", "Mining Trucks", "Mining Trucks 830E-AC", "Mining Trucks 930E", "Mining Trucks 960E-1", "Backhoe Loaders", "Skid Steer Loaders", "Forestry Equipment", "Forestry Equipment Harvesters", "Forestry Equipment Forwarders", "Forklifts"],
      "Hitachi": ["Excavators", "Excavators Mini", "Excavators ZAXIS series", "Excavators EX series", "Excavators Short Radius", "Excavators Conventional", "Excavators Long Reach", "Excavators Heavy Duty", "Wheel Loaders", "Wheel Loaders ZW series", "Rigid Dump Trucks", "Rigid Dump Trucks EH series", "Recycle machines", "Compaction equipment", "Bulldozers", "Cranes", "Cranes Lattice Boom Crawler", "Cranes Telescopic Boom Crawler", "Cranes Rough-terrain", "Cranes Truck", "Cranes Floating"],
      "Sany": ["Excavators", "Cranes", "Concrete Machinery", "Mining Trucks", "Mining Trucks SKT", "Mining Trucks SET", "Mining Trucks SRT", "Mining Trucks SAT series", "Road Rollers/Compactors", "Wheel Loaders", "Backhoe Loaders", "Motor Graders", "Port Machinery", "Port Machinery Reach Stackers", "Port Machinery Forklifts", "Electric Trucks"],
      "Zoomlion": ["Cranes", "Excavators", "Earthmoving Machinery", "Earthmoving Machinery Loaders", "Earthmoving Machinery Bulldozers", "Mobile Crane Machinery", "Mobile Crane Machinery Truck", "Mobile Crane Machinery Crawler", "Mobile Crane Machinery All-Terrain", "Construction Hoisting Machinery", "Construction Hoisting Machinery Tower Cranes", "Concrete Machinery", "Agricultural Machinery", "Industrial Vehicles", "Industrial Vehicles Forklifts", "Foundation Machinery", "Mining Machinery", "Emergency Equipment"],
      "Micro": ["Duo Deck", "Duo Deck bus"]
    },
    "Military": {
      "Volkswagen": ["Kübelwagen", "Schwimmwagen", "Thing", "Thing Type 181"]
    },
    "ATVs": {
      "Honda": ["FourTrax Foreman", "FourTrax Rancher", "FourTrax Recon", "FourTrax Rincon", "TRX250X", "TRX90X", "Sportrax 400EX"],
      "Yamaha": ["Grizzly 700", "Grizzly 90", "Kodiak 700", "Kodiak 450", "Raptor 700R", "Raptor 110", "YFZ450R", "Wolverine RMAX"],
      "Polaris": ["Sportsman 570", "Sportsman 850", "Sportsman 1000", "Sportsman XP 1000", "Sportsman 450", "Outlaw 70", "Outlaw 110", "Scrambler XP 1000", "Phoenix 200"],
      "Can-Am": ["Outlander 570", "Outlander 650", "Outlander 850", "Outlander 1000R", "Outlander MAX", "Renegade 570", "Renegade 850", "Renegade 1000R", "DS 90", "DS 250"],
      "Kawasaki": ["Brute Force 300", "Brute Force 750", "KFX 50", "KFX 90", "KFX 450R"],
      "Suzuki": ["KingQuad 400", "KingQuad 500", "KingQuad 750", "QuadSport Z90", "QuadSport Z400"],
      "Arctic Cat": ["Alterra 300", "Alterra 450", "Alterra 570", "Alterra 600", "Alterra 700", "Wildcat 1000"],
      "CF Moto": ["CForce 400", "CForce 500", "CForce 600", "CForce 800", "CForce 1000"]
    },
    "Side-by-Sides": {
      "Honda": ["Pioneer 500", "Pioneer 700", "Pioneer 1000", "Talon 1000R", "Talon 1000X"],
      "Polaris": ["RZR 200", "RZR Trail", "RZR Trail S", "RZR XP 1000", "RZR Pro XP", "RZR Turbo R", "RZR Pro R", "Ranger 500", "Ranger 570", "Ranger 1000", "Ranger XP 1000", "Ranger Crew", "General 1000", "General XP 1000"],
      "Can-Am": ["Maverick Sport", "Maverick Trail", "Maverick X3", "Maverick R", "Commander 700", "Commander 1000", "Defender", "Defender MAX"],
      "Yamaha": ["Wolverine X2", "Wolverine X4", "Wolverine RMAX2", "Wolverine RMAX4", "YXZ1000R", "Viking", "Viking VI"],
      "Kawasaki": ["Teryx 800", "Teryx KRX 1000", "Teryx S", "Mule 4010", "Mule Pro-FX", "Mule Pro-MX", "Mule SX"],
      "Arctic Cat": ["Prowler Pro", "Prowler 500", "Wildcat XX", "Havoc X"],
      "CF Moto": ["ZForce 500", "ZForce 800", "ZForce 950", "ZForce 1000", "UForce 600", "UForce 800", "UForce 1000"]
    },
    "Taxis": {
      "Austin": ["London Taxicab", "London Taxicab FX3", "London Taxicab FX4"],
      "LEVC": ["TX", "TX5", "VN5"],
      "Toyota": ["JPN Taxi", "Comfort", "Crown Comfort"]
    },
    "Spare Parts": {
      "Japanese Brands": ["Toyota", "Nissan", "Honda", "Mitsubishi", "Suzuki", "Mazda", "Isuzu", "Daihatsu", "Subaru", "Yamaha", "Acura", "Infiniti", "Lexus", "Mitsubishi Fuso", "UD Trucks", "Hino"],
      "Indian Brands": ["Tata", "Bajaj", "TVS", "Hero", "Mahindra", "Ashok Leyland", "Eicher", "Maruti Suzuki", "Hindustan Motors"],
      "Korean Brands": ["Hyundai", "Kia", "Genesis", "SsangYong"],
      "European Brands": ["Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Peugeot", "Renault", "Volvo", "Land Rover", "Fiat", "Porsche", "MAN", "Opel", "Alfa Romeo", "Lancia", "Maserati", "Lamborghini", "Ferrari", "Pagani", "Citroën", "DS Automobiles", "Jaguar", "Bentley", "Lotus", "McLaren", "Mini", "Rolls-Royce", "Vauxhall", "Aston Martin", "Saab", "Koenigsegg", "Polestar", "Škoda", "KTM"],
      "American Brands": ["Ford", "Chevrolet", "Jeep", "Cadillac", "Chrysler", "Dodge", "GMC", "Lincoln", "Ram Trucks", "Tesla", "Lucid", "Rivian"],
      "Chinese Brands": ["DFSK", "Micro", "Geely", "Chery", "Zotye", "Foton", "JAC", "BYD", "Great Wall", "SAIC", "NIO", "XPENG"]
    }
  };

  return rawData;
};

export const vehicleModelsData = parseVehicleModelsData();

// Get all unique categories
export const getCategories = (): string[] => {
  return Object.keys(vehicleModelsData);
};

// Get all makers for a category
export const getMakersForCategory = (category: string): string[] => {
  return Object.keys(vehicleModelsData[category] || {});
};

// Get models for a specific category and maker
export const getModelsForMaker = (category: string, maker: string): string[] => {
  return vehicleModelsData[category]?.[maker] || [];
};

// Get all models for a category (all makers)
export const getAllModelsForCategory = (category: string): string[] => {
  const categoryData = vehicleModelsData[category];
  if (!categoryData) return [];
  
  const allModels: string[] = [];
  Object.values(categoryData).forEach((models) => {
    allModels.push(...models);
  });
  return [...new Set(allModels)].sort();
};

// Get all models across all categories
export const getAllModels = (): string[] => {
  const allModels: string[] = [];
  Object.values(vehicleModelsData).forEach((category) => {
    Object.values(category).forEach((models) => {
      allModels.push(...models);
    });
  });
  return [...new Set(allModels)].sort();
};
