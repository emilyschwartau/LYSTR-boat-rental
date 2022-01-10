

// jetski data
jetSkiMake = ['Kawasaki', 'Sea-Doo', 'Yamaha', 'Sea Doo']
jetSkiModel = ['Jetski', 'Spark', 'GTI 90', 'WaveRunner', 'Traax']
jetSkiTitle = [
        'This wave runner is fast!',
        'Jetski fits 2 up and is super easy to climb on',
        'A waverunner that anyone can drive, pulls an inflatable too!',
        'This mean watercraft does tricks and races across the lake',
        'Tricks, Cruising, pull a tube, this PWC does it all!',
        'Lake Ready, clean and serviced, ready to ride',
        'Alumicraft Fishing Boat for the whole family!',
]
jetSkiDescription = [
        'There’s no faster way to an adventure-filled vacation than on the back of a jet ski rental.',
        'You will love zipping over the sparkling waters past the wilderness.',
        'This machine is made for speed with a 110 hp engine its packed with fun. Fits up to 3 people or 500 pounds. Take one out alone or ride the family.',
        'Sea Doo 3up 90 Hp with reverse',
        'Brand new Sea Doo',
        'This rig makes pulling off tricks so easy and so much fun, you will never want the day to end.',
        'High-octane fun',
        'Stop sooner and dock with ease',
        'Swim platform is ideal for boarding, lounging, and prepping for tow sports',
        'Easy and fun to drive',
        'Improved stability and confidence, with or without passengers',
        'Choose riding modes such as Sport and ECO'
]

// pontoon data
pontoonMake = ['Bennington','Tracker','Sun Tracker', 'Harris', 'Manitou','Premir']
pontoonModel = ['2050 LX', '2275 RL', 'Fishin Barge', 'Party Barge 18', 'Party Barge 20', 'LX 25', 'Sun Station']
pontoonTitle = [
        'Super fun family pontoon for the summer',
        'Great pontoon rental for this weekend',
        'Rent this pontoon for your weekend up at the lake!!!!',
        'Cruse the lake in the evenings and pull skiers during the day with this amazing pontoon',
        'The whole family will fit on this boat plus the dogs',
        'Nothing beats cruising the lakes on a pontoon boat!',
        'Your guests a ton of comfort and convenience features to enjoy'
        
]
pontoonDescription = [
        'The perfect mix of class and comfort for a calm',
        'Accommodate up to 12 passengers!',
        'Equipped with a 60 hp Yamaha engine with power tilt',
        'Swim platform, bimini top, lifevests and a cockpit fit for a Cadillac.', 
        'The 22 Bennington 2275 RL is a very elegant and roomy pontoon.',
        'Seats up to 11 people, 115 hp Yamaha engine',
        'Has a swim deck, changing room, AM/FM CD compatible, champagne color, tow bar, and sun pad',
        'In addition to lights in the Bimini top, there are interior lights throughout to keep the party going after dark.',
        'The seat-back compartments can even be accessed while sitting down!'
]

// kayak data
kayakMake = ['Perception','Fade Firemen','Neptune','Vapor10','Excursion Pro', 'Aruba']
kayakModel = ['Lime Drift', 'Argo 100x','Sweepp 100x','Sunset 13', 'Excursion 10','Conduit 13']
kayakTitle = [
        'Safe entry-level kayak',
        'Get out on the water on a kayak',
        'Explore the shores with a kayak',
        'Paddle the shallow water with a kayak',
        'Explore silently',
        'Perfect balance of speed and fun for beginners and intermediate paddlers.' 

]
kayakDescription = [
        'Stable sit-inside kayak that is great for lakes',
        'Easy to transport, store, and paddle',
        'Padded seating to keep you on the water longer',
        'Convenient dashboard with bungee lashing to secure your gear',
        'Drink holder keeps your refreshment within easy reach',
        '10 in rear hatch for additional storage',
        'Molded-In front and rear handles for easy transport',
        'Bow and stern flotation for additional safety',
        'Effortless to turn, yet easy to point straight to your destination'


]

// runabout data
runaboutMake = ['Cobalt','Sea Ray','Carver','Four Winns']
runaboutModel = ['220S', '210 Select', 'Sport', 'Runner', 'LX 240', 'Cruiser','Bow Rider']
runaboutTitle = [
        'Sport Boat',
        'Great Family Boat',
        'Fun Summer boat to explore the lake',
        'Enjoy freedom and adventure on the water',
        'Come take a look this boat is ready to go!'
]
runaboutDescription = [
        'Great boat for the family. Teach the kids to ski this summer!',
        'Teach the kids to ski this summer! Explore the lakes',
        'Explore the big lakes all while you are at the cabin',
        'You and the kids will make great memories exploring the waters around Long Lake',
        'Sun pads on the back deck for lounging all day!',
        'Room and convenience of a deckboat. Style and performance of a sportboat',
        'A BIG bow rider suited for a group of friends or family.',
        'Overhead bimini top keeps you in the shade when you need it'
]

// fishing data
fishingMake = ['Nitro','Champion','Tracker', '']
fishingModel = ['Sport X', 'Multi Species', '210 XV','Z Series']
fishingTitle = [
        'Fast Nitro Sport Series fishing boat. Get to the hot spots fast! Open deck, 200hp, fish finder, trolling motor',
        'Multi Species Nitro Boat, Deep Hull, great for big choppy water!',
        'Easy to operate fishing boat, comfortable great for getting the big ones!',
        'Z Series Nitro! FAST!! Fly across the lake to the next spot!',
        'Alumicraft Fishing Boat for the whole family!',
]
fishingDescription = [
        'Swim platforms on both port and starboard side',
        'Yamaha engine',
        'Bimini top',
        'Garmin 942xsv chart plotter with traditional, chirp and side-scan transducer',
        'Garmin Panoptix Livescope, which is also hooked into Garmin 942xsv',
        'Minn Kota Terrova 24v 60" trolling motor with quick release mounting plate',
        'Upgraded all rod holders and cupholders to Mat-Series SS rod/cup holders 6 in total',
        'FAST!! Fly across the lake to the next spot!',
        'Bring a guide out on Spider Lake and fish like a pro',
        'Easy to operate fishing boat, comfortable great for getting the big ones!',
        'Buckle up and wear a PFD this boat flies!',
        'Great boat that fits 4 adults comfortable, great fishing from any side of the boat!',
        
]

// generates random number based on array length
function randomNum(arr) {
        arr.length = Math.floor(arr.length);
        return Math.floor(Math.random() * arr.length )
}

// generates random number between a range of numbers
function randomRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
}


address = [ 
        // {
        //         street: '5600 STATE HIGHWAY 25',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '12800 30TH',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '23000 COUNTY ROAD 2',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '18100 COUNTY ROAD 2',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '3100 COUNTY ROAD 23',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '4200 THESING',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '4900 COUNTY ROAD 9',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '5300 STATE HIGHWAY 25',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '2500 LENNOX',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '12900 TWO MILE',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '1400  DAGGETT HALL',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '15100  SCHUBERT',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '4900  170TH',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '8700  MOGENSEN SHORES',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '13000  WICKLUND',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '4300  170TH',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '5200  BROOK CREEK',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '3800  COUNTY ROAD 113',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '101  4TH',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '200  1ST',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '201 W MAIN',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '20765 Turner Trial',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '20730 Beaver Dr',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '201 5TH',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '201 E MAIN',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '606 5th St NW',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '23455 Co Rd 31',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '900 POPLAR',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '20156 Barbara Ln',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '20 W MAIN',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '316 4th St NW',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '102 4th St N W',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '20134 Rabbit Ct',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '21700 COUNTY ROAD',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '26700 STATE HIGHWAY 6',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '1000 3RD',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '900 POPLAR',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '100 4TH',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '20 W MAIN',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '411 Cross Ave N',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '100 3RD',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '1 3RD',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '21700 COUNTY ROAD 30',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '26700 STATE HIGHWAY 6',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '1 6TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '708 2ND',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '208 2ND',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '401 6TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '100 5TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '301 4TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '300 4TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '201 3RD',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '401 6TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '200 5TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '500 1ST',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '217 2ND',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '100 5TH ',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '101 1ST',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '2nd St NE',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '200 2ND',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '401 6TH',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '30199 400th Street',
        //         city: 'Aitkin',
        //         zip: '56431'
        // },
        // {
        //         street: '16973 Blakeman Road',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '19135 Spencer Rd',
        //         city: 'Baxter',
        //         zip: '56401'
        // },
        // {
        //         street: '9522 Northgate Ln',
        //         city: 'Brainerd',
        //         zip: '56401'
        // },
        // {
        //         street: '22267 Buckhorn Trail',
        //         city: 'Merrifield',
        //         zip: '56465'
        // },
        // {
        //         street: '23048 Antler Rd',
        //         city: 'Crosby',
        //         zip: '56441'
        // },
        // {
        //         street: '23744 Clover Dr',
        //         city: 'Merrifield',
        //         zip: '56465'
        // },
        // {
        //         street: '12235 Lakeview Ln',
        //         city: 'Merrifield',
        //         zip: '56465'
        // },
        {
                street: '19696 Love Lake Rd',
                city: 'Brainerd',
                zip: '56401'
        },
        

]

vehicleModel = {
        title: '',
        type: '',
        make: '',
        model: '',
        year: '',
        length: '',
        capacity: '',
        horsepower: '',
        state: 'MN',
        description: '',
        cabins: 0,
        heads: 0,
        dailyRate: '',
        features: []
}


vehicleExamples = [
        // {
        //         title: kayakTitle[randomNum(kayakTitle)],
        //         type: 'Kayak',
        //         make: kayakMake[randomNum(kayakMake)],
        //         model: kayakModel[randomNum(kayakModel)],
        //         year: randomRange(2012, 2022),
        //         length: randomRange(6, 13),
        //         capacity: randomRange(1,2),
        //         horsepower: 0,
        //         description: kayakDescription[randomNum(kayakDescription)],
        //         dailyRate: randomRange(50, 250)
        // },
        {
                title: fishingTitle[randomNum(fishingTitle)],
                type: 'Fishing',
                make: fishingMake[randomNum(fishingMake)],
                model: fishingModel[randomNum(fishingModel)],
                year: randomRange(2012, 2022),
                length: randomRange(17, 21),
                capacity: randomRange(2,6),
                horsepower: randomRange(100, 350),
                description: fishingDescription[randomNum(fishingDescription)],
                dailyRate: randomRange(250, 400)
        },
        // {
        //         title: runaboutTitle[randomNum(runaboutTitle)],
        //         type: 'Runabout',
        //         make: runaboutMake[randomNum(runaboutMake)],
        //         model: runaboutModel[randomNum(runaboutModel)],
        //         year: randomRange(2012, 2022),
        //         length: randomRange(18, 24),
        //         capacity: randomRange(4,7),
        //         horsepower: randomRange(150, 350),
        //         description: runaboutDescription[randomNum(runaboutDescription)],
        //         dailyRate: randomRange(300, 500)
        // },
        // {
        //         title: jetSkiTitle[randomNum(jetSkiTitle)],
        //         type: 'Jetski',
        //         make: jetSkiMake[randomNum(jetSkiMake)],
        //         model: jetSkiModel[randomNum(jetSkiModel)],
        //         year: randomRange(2012, 2022),
        //         length: randomRange(120, 200),
        //         capacity: randomRange(2,3),
        //         horsepower: randomRange(90, 200),
        //         description: jetSkiDescription[randomNum(jetSkiDescription)],
        //         dailyRate: randomRange(200, 400)
        // },
        // {
        //         title: pontoonTitle[randomNum(pontoonTitle)],
        //         type: 'Pontoon',
        //         make: pontoonMake[randomNum(pontoonMake)],
        //         model: pontoonModel[randomNum(pontoonModel)],
        //         year: randomRange(2012, 2022),
        //         length: randomRange(16, 24),
        //         capacity: randomRange(8,12),
        //         horsepower: randomRange(90, 250),
        //         description: pontoonDescription[randomNum(pontoonDescription)],
        //         dailyRate: randomRange(200, 500)
        // }
]


