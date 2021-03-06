
import { Calendar } from '../calendar/calendar';
import { cloneObject } from '../core/utils';
import { ValueData } from '../services/excel/test-data.service.spec';

export class SampleTestData {

    private static timeGenerator: Calendar = new Calendar();
    private static today: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);

    // tslint:disable:quotemark
    public static stringArray = () => ([
        "Terrance Orta",
        "Richard Mahoney LongerName",
        "Donna Price",
        "Lisa Landers",
        "Dorothy H. Spencer"
    ])

    public static numbersArray = () => ([
        10,
        20,
        30
    ])

    public static dateArray = () => ([
        new Date("2018"),
        new Date(2018, 3, 23),
        new Date(30),
        new Date("2018/03/23")
    ])

    public static emptyObjectData = () => ([
        {},
        {},
        {}
    ])

    public static noHeadersObjectArray = () => ([
        new ValueData('1'),
        new ValueData('2'),
        new ValueData('3')
    ])

    public static oneItemNumberData = () => ([{ index: 1, value: 1 }]);

    /* Fields: index: number, value: number; 2 items. */
    public static numberDataTwoFields = () => ([
        { index: 1, value: 1},
        { index: 2, value: 2}
    ])

    /* Fields: index: number, value: number, other: number, another: number; 2 items. */
    public static numberDataFourFields = () => ([
        { index: 1, value: 1, other: 1, another: 1},
        { index: 2, value: 2, other: 2, another: 2}
    ])

    /* Fields: Number: number, String: string, Boolean: boolean; Date: date; 3 items. */
    public static differentTypesData = () => ([
        { Number: 1, String: "1", Boolean: true, Date: new Date(2018, 3, 3) },
        { Number: 2, String: "2", Boolean: false, Date: new Date(2018, 5, 6) },
        { Number: 3, String: "3", Boolean: true, Date: new Date(2018, 9, 22) }
    ])

    /* Fields: Name: string, Avatar: string; 3 items. */
    public static personAvatarData = () => ([
        {
            Name: 'Person 1',
            Avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
        },
        {
            Name: 'Person 2',
            Avatar: 'https://randomuser.me/api/portraits/women/66.jpg'
        },
        {
            Name: 'Person 3',
            Avatar: 'https://randomuser.me/api/portraits/men/92.jpg'
        }
    ])

    /* Fields: name: string, phone: string; 5 items. */
    public static contactsData = () => ([
        {
            name: "Terrance Orta",
            phone: "770-504-2217"
        }, {
            name: "Richard Mahoney LongerName",
            phone: ""
        }, {
            name: "Donna Price",
            phone: "859-496-2817"
        }, {
            name: "",
            phone: "901-747-3428"
        }, {
            name: "Dorothy H. Spencer",
            phone: "573-394-9254"
        }
    ])

    /* Fields: name: string, phone: string; 6 items. Remarks: Contains special and cyrilic characters. */
    public static contactsFunkyData = () => ([
        {
            name: "Terrance Mc'Orta",
            phone: "(+359)770-504-2217 | 2218"
        }, {
            name: "Richard Mahoney /LongerName/",
            phone: ""
        }, {
            name: "Donna, \/; Price",
            phone: "859 496 28**"
        }, {
            name: "\r\n",
            phone: "901-747-3428"
        }, {
            name: "Dorothy \"H.\" Spencer",
            phone: "573-394-9254[fax]"
        }, {
            name: "Иван Иванов (1,2)",
            phone: "№ 573-394-9254"
        }
    ])

    /* Fields: name: string, phone: string; 3 items. Remarks: Contains records without values for one of the fields. */
    public static contactsDataPartial = () => ([
        {
            name: "Terrance Orta",
            phone: "770-504-2217"
        }, {
            name: "Richard Mahoney LongerName"
        }, {
            phone: "780-555-1331"
        }
    ])

    /* Data fields: ID: number, Name: string; 3 items. */
    public static personIDNameData = () => ([
        { ID: 1, Name: "Johny" },
        { ID: 2, Name: "Sally" },
        { ID: 3, Name: "Tim" }
    ])

    /* Data fields: FirstName: string, LastName: string, age:number; 3 items. */
    public static personNameAgeData = () => ([
        { FirstName: "John", LastName: "Brown", age: 20 },
        { FirstName: "Ben", LastName: "Affleck", age: 30 },
        { FirstName: "Tom", LastName: "Riddle", age: 50 }
    ])

    /* Data fields: ID: number, Name: string, LastName: string, Region: string; 7 items. */
    public static personIDNameRegionData = () => ([
        { ID: 2, Name: "Jane", LastName: "Brown", Region: "AD" },
        { ID: 1, Name: "Brad", LastName: "Williams", Region: "BD" },
        { ID: 6, Name: "Rick", LastName: "Jones", Region: "ACD"},
        { ID: 7, Name: "Rick", LastName: "BRown", Region: "DD" },
        { ID: 5, Name: "ALex", LastName: "Smith", Region: "MlDs" },
        { ID: 4, Name: "Alex", LastName: "Wilson", Region: "DC" },
        { ID: 3, Name: "Connor", LastName: "Walker", Region: "OC" }
    ])

    /* Data fields: ID: number, Name: string, JobTitle: string, HireDate: string; 10 items, sorted by ID. */
    public static personJobDataFull = () => ([
        { ID: 1, Name: "Casey Houston", JobTitle: "Vice President", HireDate: "2017-06-19T11:43:07.714Z" },
        { ID: 2, Name: "Gilberto Todd", JobTitle: "Director", HireDate: "2015-12-18T11:23:17.714Z" },
        { ID: 3, Name: "Tanya Bennett", JobTitle: "Director", HireDate: "2005-11-18T11:23:17.714Z" },
        { ID: 4, Name: "Jack Simon", JobTitle: "Software Developer", HireDate: "2008-12-18T11:23:17.714Z" },
        { ID: 5, Name: "Celia Martinez", JobTitle: "Senior Software Developer", HireDate: "2007-12-19T11:23:17.714Z" },
        { ID: 6, Name: "Erma Walsh", JobTitle: "CEO", HireDate: "2016-12-18T11:23:17.714Z" },
        { ID: 7, Name: "Debra Morton", JobTitle: "Associate Software Developer", HireDate: "2005-11-19T11:23:17.714Z" },
        { ID: 8, Name: "Erika Wells", JobTitle: "Software Development Team Lead", HireDate: "2005-10-14T11:23:17.714Z" },
        { ID: 9, Name: "Leslie Hansen", JobTitle: "Associate Software Developer", HireDate: "2013-10-10T11:23:17.714Z" },
        { ID: 10, Name: "Eduardo Ramirez", JobTitle: "Manager", HireDate: "2011-11-28T11:23:17.714Z" }
    ])

    /* Data fields: ID: number, Name: string, JobTitle: string; 10 items, sorted by ID. */
    public static personJobData = () => ([
        { ID: 1, Name: "Casey Houston", JobTitle: "Vice President" },
        { ID: 2, Name: "Gilberto Todd", JobTitle: "Director" },
        { ID: 3, Name: "Tanya Bennett", JobTitle: "Director" },
        { ID: 4, Name: "Jack Simon", JobTitle: "Software Developer" },
        { ID: 5, Name: "Celia Martinez", JobTitle: "Senior Software Developer" },
        { ID: 6, Name: "Erma Walsh", JobTitle: "CEO" },
        { ID: 7, Name: "Debra Morton", JobTitle: "Associate Software Developer" },
        { ID: 8, Name: "Erika Wells", JobTitle: "Software Development Team Lead" },
        { ID: 9, Name: "Leslie Hansen", JobTitle: "Associate Software Developer" },
        { ID: 10, Name: "Eduardo Ramirez", JobTitle: "Manager" }
    ])

    /* Data fields: ID: number, Name: string, JobTitle: string, Company: string; 10 items, sorted by ID. */
    public static personIDNameJobCompany = () => ([
        { ID: 1, Name: 'Casey Houston', JobTitle: 'Vice President', Company: 'Company A' },
        { ID: 2, Name: 'Gilberto Todd', JobTitle: 'Director', Company: 'Company C' },
        { ID: 3, Name: 'Tanya Bennett', JobTitle: 'Director', Company: 'Company A' },
        { ID: 4, Name: 'Jack Simon', JobTitle: 'Software Developer', Company: 'Company D' },
        { ID: 5, Name: 'Celia Martinez', JobTitle: 'Senior Software DEVELOPER', Company: 'Company B' },
        { ID: 6, Name: 'Erma Walsh', JobTitle: 'CEO', Company: 'Company C' },
        { ID: 7, Name: 'Debra Morton', JobTitle: 'Associate Software Developer', Company: 'Company B' },
        { ID: 8, Name: 'Erika Wells', JobTitle: 'Software Development Team Lead', Company: 'Company A' },
        { ID: 9, Name: 'Leslie Hansen', JobTitle: 'Associate Software Developer', Company: 'Company D' },
        { ID: 10, Name: 'Eduardo Ramirez', JobTitle: 'Manager', Company: 'Company E' }
    ])

    /* Data fields: ID: number, CompanyName: string, ContactName: string, ContactTitle: string, Address: string,
        City: string, Region: string, PostalCode: string, Country: string, Phone: string, Fax: string;
        11 items, sorted by ID. */
    public static contactInfoData = () => ([
        {
            ID: "ALFKI",
            CompanyName: "Alfreds Futterkiste",
            ContactName: "Maria Anders",
            ContactTitle: "Sales Representative",
            Address: "Obere Str. 57",
            City: "Berlin",
            Region: null,
            PostalCode: "12209",
            Country: "Germany",
            Phone: "030-0074321",
            Fax: "030-0076545"
        },
        {
            ID: "ANATR",
            CompanyName: "Ana Trujillo Emparedados y helados",
            ContactName: "Ana Trujillo",
            ContactTitle: "Owner",
            Address: "Avda. de la Constitución 2222",
            City: "México D.F.",
            Region: null,
            PostalCode: "05021",
            Country: "Mexico",
            Phone: "(5) 555-4729",
            Fax: "(5) 555-3745"
        },
        {
            ID: "ANTON",
            CompanyName: "Antonio Moreno Taquería",
            ContactName: "Antonio Moreno",
            ContactTitle: "Owner",
            Address: "Mataderos 2312",
            City: "México D.F.",
            Region: null,
            PostalCode: "05023",
            Country: "Mexico",
            Phone: "(5) 555-3932",
            Fax: null
        },
        {
            ID: "AROUT",
            CompanyName: "Around the Horn",
            ContactName: "Thomas Hardy",
            ContactTitle: "Sales Representative",
            Address: "120 Hanover Sq.",
            City: "London",
            Region: null,
            PostalCode: "WA1 1DP",
            Country: "UK",
            Phone: "(171) 555-7788",
            Fax: "(171) 555-6750"
        },
        {
            ID: "BERGS",
            CompanyName: "Berglunds snabbköp",
            ContactName: "Christina Berglund",
            ContactTitle: "Order Administrator",
            Address: "Berguvsvägen 8",
            City: "Luleå",
            Region: null,
            PostalCode: "S-958 22",
            Country: "Sweden",
            Phone: "0921-12 34 65",
            Fax: "0921-12 34 67"
        },
        {
            ID: "BLAUS",
            CompanyName: "Blauer See Delikatessen",
            ContactName: "Hanna Moos",
            ContactTitle: "Sales Representative",
            Address: "Forsterstr. 57",
            City: "Mannheim",
            Region: null,
            PostalCode: "68306",
            Country: "Germany",
            Phone: "0621-08460",
            Fax: "0621-08924"
        },
        {
            ID: "BLONP",
            CompanyName: "Blondesddsl père et fils",
            ContactName: "Frédérique Citeaux",
            ContactTitle: "Marketing Manager",
            Address: "24, place Kléber",
            City: "Strasbourg",
            Region: null,
            PostalCode: "67000",
            Country: "France",
            Phone: "88.60.15.31",
            Fax: "88.60.15.32"
        },
        {
            ID: "BOLID",
            CompanyName: "Bólido Comidas preparadas",
            ContactName: "Martín Sommer",
            ContactTitle: "Owner",
            Address: "C/ Araquil, 67",
            City: "Madrid",
            Region: null,
            PostalCode: "28023",
            Country: "Spain",
            Phone: "(91) 555 22 82",
            Fax: "(91) 555 91 99"
        },
        {
            ID: "BONAP",
            CompanyName: "Bon app'",
            ContactName: "Laurence Lebihan",
            ContactTitle: "Owner",
            Address: "12, rue des Bouchers",
            City: "Marseille",
            Region: null,
            PostalCode: "13008",
            Country: "France",
            Phone: "91.24.45.40",
            Fax: "91.24.45.41"
        },
        {
            ID: "BOTTM",
            CompanyName: "Bottom-Dollar Markets",
            ContactName: "Elizabeth Lincoln",
            ContactTitle: "Accounting Manager",
            Address: "23 Tsawassen Blvd.",
            City: "Tsawassen",
            Region: "BC",
            PostalCode: "T2F 8M4",
            Country: "Canada",
            Phone: "(604) 555-4729",
            Fax: "(604) 555-3745"
        },
        {
            ID: "BSBEV",
            CompanyName: "B's Beverages",
            ContactName: "Victoria Ashworth",
            ContactTitle: "Sales Representative",
            Address: "Fauntleroy Circus", City: "London",
            Region: null, PostalCode: "EC2 5NT",
            Country: "UK",
            Phone: "(171) 555-1212",
            Fax: null
        }
    ])

    /* Data fields: ID: number, CompanyName: string, ContactName: string, ContactTitle: string, Address: string,
        City: string, Region: string, PostalCode: string, Country: string, Phone: string, Fax: string;
        27 items, sorted by ID. */
    /* tslint:disable */
    public static contactInfoDataFull = () => ([
        { "ID": "ALFKI", "CompanyName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "ContactTitle": "Sales Representative", "Address": "Obere Str. 57", "City": "Berlin", "Region": null, "PostalCode": "12209", "Country": "Germany", "Phone": "030-0074321", "Fax": "030-0076545" },
        { "ID": "ANATR", "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "ContactTitle": "Owner", "Address": "Avda. de la Constitución 2222", "City": "México D.F.", "Region": null, "PostalCode": "05021", "Country": "Mexico", "Phone": "(5) 555-4729", "Fax": "(5) 555-3745" },
        { "ID": "ANTON", "CompanyName": "Antonio Moreno Taquería", "ContactName": "Antonio Moreno", "ContactTitle": "Owner", "Address": "Mataderos 2312", "City": "México D.F.", "Region": null, "PostalCode": "05023", "Country": "Mexico", "Phone": "(5) 555-3932", "Fax": null },
        { "ID": "AROUT", "CompanyName": "Around the Horn", "ContactName": "Thomas Hardy", "ContactTitle": "Sales Representative", "Address": "120 Hanover Sq.", "City": "London", "Region": null, "PostalCode": "WA1 1DP", "Country": "UK", "Phone": "(171) 555-7788", "Fax": "(171) 555-6750" },
        { "ID": "BERGS", "CompanyName": "Berglunds snabbköp", "ContactName": "Christina Berglund", "ContactTitle": "Order Administrator", "Address": "Berguvsvägen 8", "City": "Luleå", "Region": null, "PostalCode": "S-958 22", "Country": "Sweden", "Phone": "0921-12 34 65", "Fax": "0921-12 34 67" },
        { "ID": "BLAUS", "CompanyName": "Blauer See Delikatessen", "ContactName": "Hanna Moos", "ContactTitle": "Sales Representative", "Address": "Forsterstr. 57", "City": "Mannheim", "Region": null, "PostalCode": "68306", "Country": "Germany", "Phone": "0621-08460", "Fax": "0621-08924" },
        { "ID": "BLONP", "CompanyName": "Blondesddsl père et fils", "ContactName": "Frédérique Citeaux", "ContactTitle": "Marketing Manager", "Address": "24, place Kléber", "City": "Strasbourg", "Region": null, "PostalCode": "67000", "Country": "France", "Phone": "88.60.15.31", "Fax": "88.60.15.32" },
        { "ID": "BOLID", "CompanyName": "Bólido Comidas preparadas", "ContactName": "Martín Sommer", "ContactTitle": "Owner", "Address": "C/ Araquil, 67", "City": "Madrid", "Region": null, "PostalCode": "28023", "Country": "Spain", "Phone": "(91) 555 22 82", "Fax": "(91) 555 91 99" },
        { "ID": "BONAP", "CompanyName": "Bon app'", "ContactName": "Laurence Lebihan", "ContactTitle": "Owner", "Address": "12, rue des Bouchers", "City": "Marseille", "Region": null, "PostalCode": "13008", "Country": "France", "Phone": "91.24.45.40", "Fax": "91.24.45.41" },
        { "ID": "BOTTM", "CompanyName": "Bottom-Dollar Markets", "ContactName": "Elizabeth Lincoln", "ContactTitle": "Accounting Manager", "Address": "23 Tsawassen Blvd.", "City": "Tsawassen", "Region": "BC", "PostalCode": "T2F 8M4", "Country": "Canada", "Phone": "(604) 555-4729", "Fax": "(604) 555-3745" },
        { "ID": "BSBEV", "CompanyName": "B's Beverages", "ContactName": "Victoria Ashworth", "ContactTitle": "Sales Representative", "Address": "Fauntleroy Circus", "City": "London", "Region": null, "PostalCode": "EC2 5NT", "Country": "UK", "Phone": "(171) 555-1212", "Fax": null },
        { "ID": "CACTU", "CompanyName": "Cactus Comidas para llevar", "ContactName": "Patricio Simpson", "ContactTitle": "Sales Agent", "Address": "Cerrito 333", "City": "Buenos Aires", "Region": null, "PostalCode": "1010", "Country": "Argentina", "Phone": "(1) 135-5555", "Fax": "(1) 135-4892" },
        { "ID": "CENTC", "CompanyName": "Centro comercial Moctezuma", "ContactName": "Francisco Chang", "ContactTitle": "Marketing Manager", "Address": "Sierras de Granada 9993", "City": "México D.F.", "Region": null, "PostalCode": "05022", "Country": "Mexico", "Phone": "(5) 555-3392", "Fax": "(5) 555-7293" },
        { "ID": "CHOPS", "CompanyName": "Chop-suey Chinese", "ContactName": "Yang Wang", "ContactTitle": "Owner", "Address": "Hauptstr. 29", "City": "Bern", "Region": null, "PostalCode": "3012", "Country": "Switzerland", "Phone": "0452-076545", "Fax": null },
        { "ID": "COMMI", "CompanyName": "Comércio Mineiro", "ContactName": "Pedro Afonso", "ContactTitle": "Sales Associate", "Address": "Av. dos Lusíadas, 23", "City": "Sao Paulo", "Region": "SP", "PostalCode": "05432-043", "Country": "Brazil", "Phone": "(11) 555-7647", "Fax": null },
        { "ID": "CONSH", "CompanyName": "Consolidated Holdings", "ContactName": "Elizabeth Brown", "ContactTitle": "Sales Representative", "Address": "Berkeley Gardens 12 Brewery", "City": "London", "Region": null, "PostalCode": "WX1 6LT", "Country": "UK", "Phone": "(171) 555-2282", "Fax": "(171) 555-9199" },
        { "ID": "DRACD", "CompanyName": "Drachenblut Delikatessen", "ContactName": "Sven Ottlieb", "ContactTitle": "Order Administrator", "Address": "Walserweg 21", "City": "Aachen", "Region": null, "PostalCode": "52066", "Country": "Germany", "Phone": "0241-039123", "Fax": "0241-059428" },
        { "ID": "DUMON", "CompanyName": "Du monde entier", "ContactName": "Janine Labrune", "ContactTitle": "Owner", "Address": "67, rue des Cinquante Otages", "City": "Nantes", "Region": null, "PostalCode": "44000", "Country": "France", "Phone": "40.67.88.88", "Fax": "40.67.89.89" },
        { "ID": "EASTC", "CompanyName": "Eastern Connection", "ContactName": "Ann Devon", "ContactTitle": "Sales Agent", "Address": "35 King George", "City": "London", "Region": null, "PostalCode": "WX3 6FW", "Country": "UK", "Phone": "(171) 555-0297", "Fax": "(171) 555-3373" },
        { "ID": "ERNSH", "CompanyName": "Ernst Handel", "ContactName": "Roland Mendel", "ContactTitle": "Sales Manager", "Address": "Kirchgasse 6", "City": "Graz", "Region": null, "PostalCode": "8010", "Country": "Austria", "Phone": "7675-3425", "Fax": "7675-3426" },
        { "ID": "FAMIA", "CompanyName": "Familia Arquibaldo", "ContactName": "Aria Cruz", "ContactTitle": "Marketing Assistant", "Address": "Rua Orós, 92", "City": "Sao Paulo", "Region": "SP", "PostalCode": "05442-030", "Country": "Brazil", "Phone": "(11) 555-9857", "Fax": null },
        { "ID": "FISSA", "CompanyName": "FISSA Fabrica Inter. Salchichas S.A.", "ContactName": "Diego Roel", "ContactTitle": "Accounting Manager", "Address": "C/ Moralzarzal, 86", "City": "Madrid", "Region": null, "PostalCode": "28034", "Country": "Spain", "Phone": "(91) 555 94 44", "Fax": "(91) 555 55 93" },
        { "ID": "FOLIG", "CompanyName": "Folies gourmandes", "ContactName": "Martine Rancé", "ContactTitle": "Assistant Sales Agent", "Address": "184, chaussée de Tournai", "City": "Lille", "Region": null, "PostalCode": "59000", "Country": "France", "Phone": "20.16.10.16", "Fax": "20.16.10.17" },
        { "ID": "FOLKO", "CompanyName": "Folk och fä HB", "ContactName": "Maria Larsson", "ContactTitle": "Owner", "Address": "Åkergatan 24", "City": "Bräcke", "Region": null, "PostalCode": "S-844 67", "Country": "Sweden", "Phone": "0695-34 67 21", "Fax": null },
        { "ID": "FRANK", "CompanyName": "Frankenversand", "ContactName": "Peter Franken", "ContactTitle": "Marketing Manager", "Address": "Berliner Platz 43", "City": "München", "Region": null, "PostalCode": "80805", "Country": "Germany", "Phone": "089-0877310", "Fax": "089-0877451" },
        { "ID": "FRANR", "CompanyName": "France restauration", "ContactName": "Carine Schmitt", "ContactTitle": "Marketing Manager", "Address": "54, rue Royale", "City": "Nantes", "Region": null, "PostalCode": "44000", "Country": "France", "Phone": "40.32.21.21", "Fax": "40.32.21.20" },
        { "ID": "FRANS", "CompanyName": "Franchi S.p.A.", "ContactName": "Paolo Accorti", "ContactTitle": "Sales Representative", "Address": "Via Monte Bianco 34", "City": "Torino", "Region": null, "PostalCode": "10100", "Country": "Italy", "Phone": "011-4988260", "Fax": "011-4988261" }
    ]);
    /* tslint:enable */

    // tslint:disable:quotemark
    /* Data fields: ID: number, CompanyName: string, ContactName: string, ContactTitle: string, Address: string,
        City: string, Region: string, PostalCode: string, Country: string, Phone: string, Fax: string; 1 item. */
    public static contactMariaAndersData = () => ([{
        ID: "ALFKI",
        CompanyName: "Alfreds Futterkiste",
        ContactName: "Maria Anders",
        ContactTitle: "Sales Representative",
        Address: "Obere Str. 57",
        City: "Berlin",
        Region: null,
        PostalCode: "12209",
        Country: "Germany",
        Phone: "030-0074321",
        Fax: "030-0076545"
    }])

    /* Data fields: Downloads: number, ID: number, ProductName: string, ReleaseDate: Date, Released: boolean;
        8 items, sorted by ID. */
    public static productInfoData = () => ([
        {
            Downloads: 254,
            ID: 1,
            ProductName: "Ignite UI for JavaScript",
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "day", 15),
            Released: false
        },
        {
            Downloads: 127,
            ID: 2,
            ProductName: "NetAdvantage",
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "month", -1),
            Released: true
        },
        {
            Downloads: 20,
            ID: 3,
            ProductName: "Ignite UI for Angular",
            ReleaseDate: null,
            Released: null
        },
        {
            Downloads: null,
            ID: 4,
            ProductName: null,
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "day", -1),
            Released: true
        },
        {
            Downloads: 100,
            ID: 5,
            ProductName: "",
            ReleaseDate: undefined,
            Released: ""
        },
        {
            Downloads: 702,
            ID: 6,
            ProductName: "Some other item with Script",
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "day", 1),
            Released: null
        },
        {
            Downloads: 0,
            ID: 7,
            ProductName: null,
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "month", 1),
            Released: true
        },
        {
            Downloads: 1000,
            ID: 8,
            ProductName: null,
            ReleaseDate: SampleTestData.today,
            Released: false
        }
    ])

    /* Data fields: Downloads: number, ID: number, ProductName: string, ReleaseDate: Date, Released: boolean,
        Category: string, Items: string, Test: string;
        8 items, sorted by ID. */
    public static productInfoDataFull = () => ([
        {
            Downloads: 254,
            ID: 1,
            ProductName: "Ignite UI for JavaScript",
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "day", 15),
            Released: false,
            Category: "Category 1",
            Items: "Item 1",
            Test: "Test 1"
        },
        {
            Downloads: 127,
            ID: 2,
            ProductName: "NetAdvantage",
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "month", -1),
            Released: true,
            Category: "Category 2",
            Items: "Item 2",
            Test: "Test 2"
        },
        {
            Downloads: 20,
            ID: 3,
            ProductName: "Ignite UI for Angular",
            ReleaseDate: null,
            Released: null,
            Category: "Category 3",
            Items: "Item 3",
            Test: "Test 3"
        },
        {
            Downloads: null,
            ID: 4,
            ProductName: null,
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "day", -1),
            Released: true,
            Category: "Category 4",
            Items: "Item 4",
            Test: "Test 4"
        },
        {
            Downloads: 100,
            ID: 5,
            ProductName: "",
            ReleaseDate: undefined,
            Released: "",
            Category: "Category 5",
            Items: "Item 5",
            Test: "Test 5"
        },
        {
            Downloads: 702,
            ID: 6,
            ProductName: "Some other item with Script",
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "day", 1),
            Released: null,
            Category: "Category 6",
            Items: "Item 6",
            Test: "Test 6"
        },
        {
            Downloads: 0,
            ID: 7,
            ProductName: null,
            ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "month", 1),
            Released: true,
            Category: "Category 7",
            Items: "Item 7",
            Test: "Test 7"
        },
        {
            Downloads: 1000,
            ID: 8,
            ProductName: null,
            ReleaseDate: SampleTestData.today,
            Released: false,
            Category: "Category 8",
            Items: "Item 8",
            Test: "Test 8"
        }
    ])

    /* Data fields: ProductID: number, ProductName: string, InStock: boolean, UnitsInStock: number, OrderDate: Date;
        10 items, sorted by ID. */
    public static foodProductData = () => ([
        { ProductID: 1, ProductName: "Chai", InStock: true, UnitsInStock: 2760, OrderDate: new Date("2005-03-21") },
        { ProductID: 2, ProductName: "Aniseed Syrup", InStock: false, UnitsInStock: 198, OrderDate: new Date("2008-01-15") },
        { ProductID: 3, ProductName: "Chef Antons Cajun Seasoning", InStock: true, UnitsInStock: 52, OrderDate: new Date("2010-11-20") },
        { ProductID: 4, ProductName: "Grandmas Boysenberry Spread", InStock: false, UnitsInStock: 0, OrderDate: new Date("2007-10-11") },
        { ProductID: 5, ProductName: "Uncle Bobs Dried Pears", InStock: false, UnitsInStock: 0, OrderDate: new Date("2001-07-27") },
        { ProductID: 6, ProductName: "Northwoods Cranberry Sauce", InStock: true, UnitsInStock: 1098, OrderDate: new Date("1990-05-17") },
        { ProductID: 7, ProductName: "Queso Cabrales", InStock: false, UnitsInStock: 0, OrderDate: new Date("2005-03-03") },
        { ProductID: 8, ProductName: "Tofu", InStock: true, UnitsInStock: 7898, OrderDate: new Date("2017-09-09") },
        { ProductID: 9, ProductName: "Teatime Chocolate Biscuits", InStock: true, UnitsInStock: 6998, OrderDate: new Date("2025-12-25") },
        { ProductID: 10, ProductName: "Chocolate", InStock: true, UnitsInStock: 20000, OrderDate: new Date("2018-03-01") }
    ])

    /* Data fields: ProductID: number, ProductName: string, InStock: boolean, UnitsInStock: number, OrderDate: Date;
        19 items, sorted by ID. */
    public static foodProductDataExtended = () => ([
        { ProductID: 1, ProductName: "Chai", InStock: true, UnitsInStock: 2760, OrderDate: new Date("2005-03-21") },
        { ProductID: 2, ProductName: "Aniseed Syrup", InStock: false, UnitsInStock: 198, OrderDate: new Date("2008-01-15") },
        { ProductID: 3, ProductName: "Chef Antons Cajun Seasoning", InStock: true, UnitsInStock: 52, OrderDate: new Date("2010-11-20") },
        { ProductID: 4, ProductName: "Grandmas Boysenberry Spread", InStock: false, UnitsInStock: 0, OrderDate: new Date("2007-10-11") },
        { ProductID: 5, ProductName: "Uncle Bobs Dried Pears", InStock: false, UnitsInStock: 0, OrderDate: new Date("2001-07-27") },
        { ProductID: 6, ProductName: "Northwoods Cranberry Sauce", InStock: true, UnitsInStock: 1098, OrderDate: new Date("1990-05-17") },
        { ProductID: 7, ProductName: "Queso Cabrales", InStock: false, UnitsInStock: 0, OrderDate: new Date("2005-03-03") },
        { ProductID: 8, ProductName: "Tofu", InStock: true, UnitsInStock: 7898, OrderDate: new Date("2017-09-09") },
        { ProductID: 9, ProductName: "Teatime Chocolate Biscuits", InStock: true, UnitsInStock: 6998, OrderDate: new Date("2025-12-25") },
        { ProductID: 10, ProductName: "Pie", InStock: true, UnitsInStock: 1000, OrderDate: new Date("2017-05-07") },
        { ProductID: 11, ProductName: "Pasta", InStock: false, UnitsInStock: 198, OrderDate: new Date("2001-02-15") },
        { ProductID: 12, ProductName: "Krusty krab's burger", InStock: true, UnitsInStock: 52, OrderDate: new Date("2012-09-25") },
        { ProductID: 13, ProductName: "Lasagna", InStock: false, UnitsInStock: 0, OrderDate: new Date("2015-02-09") },
        { ProductID: 14, ProductName: "Uncle Bobs Dried Pears", InStock: false, UnitsInStock: 0, OrderDate: new Date("2008-03-17") },
        { ProductID: 15, ProductName: "Cheese", InStock: true, UnitsInStock: 1098, OrderDate: new Date("1990-11-27") },
        { ProductID: 16, ProductName: "Devil's Hot Chilli Sauce", InStock: false, UnitsInStock: 0, OrderDate: new Date("2012-08-14") },
        { ProductID: 17, ProductName: "Parmesan", InStock: true, UnitsInStock: 4898, OrderDate: new Date("2017-09-09") },
        { ProductID: 18, ProductName: "Steaks", InStock: true, UnitsInStock: 3098, OrderDate: new Date("2025-12-25") },
        { ProductID: 19, ProductName: "Biscuits", InStock: true, UnitsInStock: 10570, OrderDate: new Date("2018-03-01") }
    ])

    /* Generates data with the following data fields: index: number, value: number, other: number, another: number. */
    public static generateNumberData(rowsCount: number) {
        const data = [];
        for (let i = 0; i < rowsCount; i++) {
            data.push({ index: i, value: i, other: i, another: i });
        }
        return data;
    }

    /* Generates columns with 'field' and 'width' fields. */
    public static generateNumberDataSpecial(rowsCount, colsCount, defaultColWidth = null) {
        const cols = [];
        for (let j = 0; j < colsCount; j++) {
            cols.push({
                field: j.toString(),
                width: defaultColWidth !== null ? defaultColWidth : j % 8 < 2 ? 100 : (j % 6) * 125
            });
        }

        const data = [];
        for (let i = 0; i < rowsCount; i++) {
            const obj = {};
            for (let j = 0; j <  cols.length; j++) {
                const col = cols[j].field;
                obj[col] = 10 * i * j;
            }
            data.push(obj);
        }
        return data;
    }

    /* Data fields: Downloads:number, ID: number, ProductName: string, ReleaseDate: Date,
                    Released: boolean, Category: string, Items: string, Test: string. */
    public static generateProductData(itemsCount: number) {
        const data = [];
        for (let i = 0; i < itemsCount; i++) {
            const item = {
                Downloads: 100 + i,
                ID: i,
                ProductName: "ProductName" + i,
                ReleaseDate: SampleTestData.timeGenerator.timedelta(SampleTestData.today, "month", -1),
                Released: true,
                Category: "Category" + i,
                Items: "Items" + i,
                Test: "test" + i
            };
            data.push(item);
        }

        return data;
    }

    /* Data fields: ID: string, Column1: string, Column2: string, Column3: string. */
    public static generateBigValuesData(rowsCount: number) {
        const bigData = [];
        for (let i = 0; i < rowsCount; i++) {
            for (let j = 0; j < 5; j++) {
                bigData.push({
                    ID: i.toString() + "_" + j.toString(),
                    Column1: i * j,
                    Column2: i * j * Math.pow(10, i),
                    Column3: i * j * Math.pow(100, i)
                });
            }
        }
        return bigData;
    }

    /* Data fields: ID: string, Column 1..N: number. */
    public static generateBigDataRowsAndCols(rowsCount: number, colsCount: number) {
        const bigData = [];
        for (let i = 0; i < rowsCount; i++) {
            const row = {};
            row["ID"] = i.toString();
            for (let j = 1; j < colsCount; j++) {
                row["Column " + j] = i * j;
            }

            bigData.push(row);
        }
        return bigData;
    }

    /* Generates columns with the following fields: key, field and header. */
    public static generateColumns(count, namePrefix = "col") {
        const cols = [];
        for (let i = 0; i < count; i++) {
            cols.push({
                key: namePrefix + i,
                field: namePrefix + i,
                header: namePrefix + i
            });
        }
        return cols;
    }

    /* Generates columns with the following fields: key, field, header and dataType. */
    public static generateColumnsByType(count, type: string, namePrefix = "col") {
        const cols = [];
        for (let i = 0; i < count; i++) {
            cols.push({
                key: namePrefix + i,
                field: namePrefix + i,
                header: namePrefix + i,
                dataType: type
            });
        }
        return cols;
    }

    /* Generates columns with the following fields: key, dataType and editable. */
    public static generateEditableColumns(count, columnsType = "string", namePrefix = "col") {
        const cols = [];
        for (let i = 0; i < count; i++) {
            if (i % 2 === 0) {
                cols.push({
                    key: namePrefix + i,
                    dataType: columnsType,
                    editable: true
                });
            } else {
                cols.push({
                    key: namePrefix + i,
                    dataType: columnsType,
                    editable: false
                });
            }
        }
        return cols;
    }

    /* Generates numeric data for the specified columns collection. */
    public static generateDataForColumns(columns: any[], rowsCount: number, startFromOne = false) {
        const data = [];

        for (let r = 0; r < rowsCount; r++) {
            const record = {};
            for (let c = 0; c < columns.length; c++) {
                (startFromOne && c === 0) ? record[columns[c].key] = 1 : record[columns[c].key] = c * r;
            }
            data.push(record);
        }

        return data;
    }

    /* Generates data with headers in the format "colNamePrefix1..N" and
    number values calculated by "colIndex * rowIndex" formula. */
    public static generateData(rowsCount, colsCount, colNamePrefix = "col") {
        const cols = SampleTestData.generateColumns(colsCount, colNamePrefix);
        const data = [];
        for (let r = 0; r < rowsCount; r++) {
            const record = {};
            for (let c = 0; c < cols.length; c++) {
                record[cols[c].field] = c * r;
            }
            data.push(record);
        }
        return data;
    }

    /* Generate a different set of data using the specified baseData.
    Note: If a numeric ID field is available, it will be incremented accordingly. */
    public static generateFromData(baseData: any[], rowsCount: number) {
        const data = [];
        const iterations = Math.floor(rowsCount / baseData.length);
        const remainder = rowsCount % baseData.length;

        for (let i = 0; i < iterations; i++) {
            baseData.forEach((item) => {
                const currentItem = cloneObject(item);
                const id = SampleTestData.getIDColumnName(currentItem);
                if (id) {
                    currentItem[id] = item[id] + i * baseData.length;
                }
                data.push(currentItem);
            });
        }
        const currentLength = data.length;
        for (let i = 0; i < remainder; i++) {
            const currentItem = cloneObject(baseData[i]);
            const id = SampleTestData.getIDColumnName(currentItem);
            if (id) {
                currentItem[id] = currentLength + baseData[i][id];
            }
            data.push(currentItem);
        }

        return data;
    }

    /* Fields: name: string, phone: string; 6 items. Remarks: Contains special and cyrilic characters.
    Certain characters serving as delimiters can be changed. Mostly used in CSV exporters tests. */
    public static getContactsFunkyData(delimiter) {
        return [{
            name: 'Terrance Mc\'Orta',
            phone: '(+359)770-504-2217 | 2218'
        }, {
            name: 'Richard Mahoney /LongerName/',
            phone: ''
        }, {
            name: 'Donna' + delimiter + ' \/; Price',
            phone: '859 496 28**'
        }, {
            name: '\r\n',
            phone: '901-747-3428'
        }, {
            name: 'Dorothy "H." Spencer',
            phone: '573-394-9254[fax]'
        }, {
            name: 'Иван Иванов (1' + delimiter + '2)',
            phone: '№ 573-394-9254'
        }];
    }

    /**
     * Generates simple array of primitve values
     * @param rows Number of items to add to the array
     * @param type The type of the items
     */
    public static generateListOfPrimitiveValues(rows: number, type: Number|String|Boolean): any[] {
        const data: any[] = [];
        for (let row = 0; row < rows; row++) {
            if (type === 'Number') {
                data.push(row);
            } else if (type === 'String') {
                data.push(`Row ${row}`);
            } else if (type === 'Boolean') {
                data.push(row % 7 === 0);
            }
        }
        return data;
    }

    /* Gets the name of the identifier column if exists. */
    private static getIDColumnName(dataItem: any) {
        if (!dataItem) {
            return undefined;
        }

        if (dataItem["ID"]) {
            return "ID";
        } else if (dataItem["Id"]) {
            return "Id";
        } else if (dataItem["id"]) {
            return "id";
        } else {
            return undefined;
        }
    }
}

    // tslint:enable:quotemark
