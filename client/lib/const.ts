const mainUrl = 'http://localhost:8080';
export const serverUrl = mainUrl + '/api/v1';
export const serverUrlV2 = mainUrl + '/api/v2';

export const modelServerUrl = 'http://localhost:8000';

export const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

export const divisions = [
    { name: 'Dhaka', districts: ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'] },
    { name: 'Chattogram', districts: ['Chattogram', 'Brahmanbaria', 'Chandpur', 'Cumilla', 'Cox\'s Bazar', 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati'] },
    { name: 'Khulna', districts: ['Khulna', 'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'] },
    { name: 'Rajshahi', districts: ['Rajshahi', 'Bogura', 'Chapainawabganj', 'Joypurhat', 'Naogaon', 'Natore', 'Pabna', 'Sirajganj'] },
    { name: 'Barishal', districts: ['Barishal', 'Barguna', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur'] },
    { name: 'Sylhet', districts: ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'] },
    { name: 'Rangpur', districts: ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'] },
    { name: 'Mymensingh', districts: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'] },
  ];
  
  export const cities = {
    Dhaka: ['Dhanmondi', 'Gulshan', 'Mirpur', 'Uttara'],
    Faridpur: ['Faridpur Sadar', 'Nagarkanda'],
    Gazipur: ['Gazipur Sadar', 'Tongi','BoardBazar'],
    Gopalganj: ['Gopalganj Sadar', 'Tungipara'],
    Kishoreganj: ['Kishoreganj Sadar', 'Bhairab'],
    Madaripur: ['Madaripur Sadar', 'Rajoir'],
    Manikganj: ['Manikganj Sadar', 'Singair'],
    Munshiganj: ['Munshiganj Sadar', 'Sreenagar'],
    Narayanganj: ['Narayanganj Sadar', 'Rupganj'],
    Narsingdi: ['Narsingdi Sadar', 'Palash'],
    Rajbari: ['Rajbari Sadar', 'Pangsha'],
    Shariatpur: ['Shariatpur Sadar', 'Damudya'],
    Tangail: ['Tangail Sadar', 'Madhupur'],
    Chattogram: ['Chattogram Sadar', 'Rangunia'],
    Brahmanbaria: ['Brahmanbaria Sadar', 'Ashuganj'],
    Chandpur: ['Chandpur Sadar', 'Haimchar'],
    Cumilla: ['Cumilla Sadar', 'Laksam'],
    "Cox's Bazar": ['Cox\'s Bazar Sadar', 'Teknaf'],
    Feni: ['Feni Sadar', 'Dagonbhuiyan'],
    Khagrachari: ['Khagrachari Sadar', 'Ramgarh'],
    Lakshmipur: ['Lakshmipur Sadar', 'Raipur'],
    Noakhali: ['Noakhali Sadar', 'Begumganj'],
    Rangamati: ['Rangamati Sadar', 'Kaptai'],
    Khulna: ['Khulna Sadar', 'Batiaghata'],
    Bagerhat: ['Bagerhat Sadar', 'Mongla'],
    Chuadanga: ['Chuadanga Sadar', 'Alamdanga'],
    Jashore: ['Jashore Sadar', 'Benapole'],
    Jhenaidah: ['Jhenaidah Sadar', 'Shailkupa'],
    Kushtia: ['Kushtia Sadar', 'Kumarkhali'],
    Magura: ['Magura Sadar', 'Mohammadpur'],
    Meherpur: ['Meherpur Sadar', 'Gangni'],
    Narail: ['Narail Sadar', 'Kalia'],
    Satkhira: ['Satkhira Sadar', 'Debhata'],
    Rajshahi: ['Rajshahi Sadar', 'Godagari'],
    Bogura: ['Bogura Sadar', 'Shibganj'],
    Chapainawabganj: ['Chapainawabganj Sadar', 'Shibganj'],
    Joypurhat: ['Joypurhat Sadar', 'Panchbibi'],
    Naogaon: ['Naogaon Sadar', 'Manda'],
    Natore: ['Natore Sadar', 'Baraigram'],
    Pabna: ['Pabna Sadar', 'Ishwardi'],
    Sirajganj: ['Sirajganj Sadar', 'Belkuchi'],
    Barishal: ['Barishal Sadar', 'Bakerganj'],
    Barguna: ['Barguna Sadar', 'Amtali'],
    Bhola: ['Bhola Sadar', 'Char Fasson'],
    Jhalokathi: ['Jhalokathi Sadar', 'Kathalia'],
    Patuakhali: ['Patuakhali Sadar', 'Kuakata'],
    Pirojpur: ['Pirojpur Sadar', 'Nazirpur'],
    Sylhet: ['Sylhet Sadar', 'Beanibazar'],
    Habiganj: ['Habiganj Sadar', 'Madhabpur'],
    Moulvibazar: ['Moulvibazar Sadar', 'Srimangal'],
    Sunamganj: ['Sunamganj Sadar', 'Chhatak'],
    Rangpur: ['Rangpur Sadar', 'Mithapukur'],
    Dinajpur: ['Dinajpur Sadar', 'Birampur'],
    Gaibandha: ['Gaibandha Sadar', 'Palashbari'],
    Kurigram: ['Kurigram Sadar', 'Nageshwari'],
    Lalmonirhat: ['Lalmonirhat Sadar', 'Patgram'],
    Nilphamari: ['Nilphamari Sadar', 'Saidpur','Domar','Dimla'],
    Panchagarh: ['Panchagarh Sadar', 'Debiganj'],
    Thakurgaon: ['Thakurgaon Sadar', 'Baliadangi'],
    Mymensingh: ['Mymensingh Sadar', 'Gafargaon'],
    Jamalpur: ['Jamalpur Sadar', 'Islampur'],
    Netrokona: ['Netrokona Sadar', 'Kendua'],
    Sherpur: ['Sherpur Sadar', 'Nakla'],
  };
  
  export default { divisions, cities };
  
  