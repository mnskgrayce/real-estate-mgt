# real-estate-mgt

Fullstack CRUD app for real estate management.

![class diagram](https://raw.githubusercontent.com/mnskgrayce/real-estate-mgt/master/class_diagram.png)

## Note

### **FRONTEND REPOSITORY**

- Get latest config files and Auth0 instructions here: https://github.com/phu0n9/real-estate

### **INSTRUCTION**

- You must start both Kafka and Redis servers to run the application
- Install Redis to test the cache: https://redis.io/topics/quickstart
- Install Kafka to test the message queue and email: https://kafka.apache.org/quickstart
- Get the `application.yaml` and `redisson.yaml` files and put them in `src/resources`
- Get the `.env` file and put it in the root folder (same level as `README.md`)

#### **House Generator**

- HouseConfig now reads sample data from `data/gen` folder
- House price range is now 200 - 1000 (USD/month)
- There is already a sample `house_1.json` file, but if you want to add more:

```
// Go to the Node project for house generation and install dependencies
cd src/main/java/eeet2582/realestatemgt/data/gen
npm i

// Modify the code, then run it
node index.js
```

### **HOUSE QUERY FORMAT (POSTMAN)**

- Search houses by sending POST request to `api/v1/houses/search/form`
- Your search form may look like below (refer to model/house/HouseSearchForm)
- You must pass a list to searched status and house type, if you only want "available" pass a list of one string
- In addition to the search form, you may include params pageNo (starts at 1), pageSize and orderBy **(sortBy removed)**
- **New search only sorts by price for now, if you need other variables tell me**

```
{
    "city": "Hanoi",
    "district": "Ba Dinh",
    "priceFrom": 200,
    "priceTo": 1000,
    "statusList": [
        "available",
        "reserved",
        "rented"
    ],
    "typeList": [
        "apartment",
        "serviced",
        "street"
    ],
    "query": ""
}
```

```
const typeList = ["apartment", "serviced", "street"];
const statusList = ["available", "reserved", "rented"];
```

## Changelogs

### 17/01/2022 (Trang)

- Rewrote Deposit, Meeting, Rental to link with AppUser and House
- Objects that contain custom classes (HouseLocation, LocalDate etc.) now @RequestBody a form of primitives
- Add to Meeting API `"/meetings/search/byDate/{range}"` ("today", "week", "month") for current range
- Add cache to all requests (Service level)
- Add sample data for all classes via a single file `BootstrapData`

### 17/01/2022 (Phuong)

- Added get user by name with pagination
- edit kafka meeting
- added more data for front end to test `meeting`, `payment`, `user`, `rental`, `deposit`

### 17/01/2022 (Trang)

- Add (HouseLocation) `location` variable to House
- Overhaul House search functions (now takes HouseSearchForm)
- Old search endpoints are still there, will delete after testing new one

### 13/01/2022 (Phuong)

- Change `getFilteredPayments` to `get payments by userId`
- Updated check auth0Id in Payments

### 12/01/2022 (Phuong)

- S3 delete does not work, only posting image to s3 works, error exception handled
- Change update house a little
- Change kafka server value

### 11/01/2022 (Phuong)

- Change auth0Id method to find respective userId in the database
- Change `delete House` and `addHouseImage`
- Bugs: Update House

### 09/01/2022 (Phuong)

- Fixed Post request in default HTTP security
- Change query params in update and post in class `UserController`
- remove `Generated.IDENTITY` in `USER` class

### 06/01/2022 (Phuong)

- Implement new cleaner Kafka version for serializer
- Add AWS key configuration
- application.yaml and back-end.env are changed, get it through
  here: https://docs.google.com/document/d/1LAGecNNdEr2tOjjm9eEe6AdkPSyLVQckuLSNnFtcTkQ/edit?usp=sharing

### 05/01/2022 (Phuong)

- Fix admin authentication, change .env file
- Added CORS in each controller

### 05/01/2022 (Trang)

- Fix out of bound errors for House pagination

### 02/01/2022 (Phuong)

- Finished Oauth2 using Auth0 and comment out all controllers endpoint
- Go to front-end repository to get access token key
- `Bugs`: Post Users endpoint --> don't test this
- Add separate `POST` and `PUT` requests using `requestBody` except for class `Meeting`

### 27/12/2021 (Trang)

- All emails are now sent from *eeet2582.realestatemgt@gmail.com*
- Configuration (YAML) files are moved to .gitignore, ask backend team
- Reduce HOUSE_BATCH_SIZE to 200, queries feel faster now (cache limit is still 1000)

### 25/12/2021 (Phuong)

- Finish KafKa for booking a meeting
- `Note`: Turn off any anti-virus for sending email

### 23/12/2021 (Trang)

- Finish Redis cache for House (get + pagination)

### 23/12/2021 (Trang)

- Generate 1M rows for House (50K rows x 20 files)
- Basic cache for House (getOne, upsert, delete)
- House objects live 20 minutes after the first time queried
- Add house data to your local machine by:
    * Download the zip file:
        * https://drive.google.com/file/d/1zK0-4ja-Lt4fnUjIQiWPpOWpa6Zz4qfy/view?usp=sharing
    * Extract `/house` folder and put the folder inside `/src/data`

### 21/12/2021 (Phuong)

- House update and tested
- How to use Postman for House
  API: https://docs.google.com/document/d/1xA9813h3P2GNO4l_WNfn-KGI0xK8Q-DQnUJFLb_P2gs/edit?usp=sharing

### 19/12/2021 (Trang)

- All endpoints for Deposit and Meeting work (get all, get one, get by userId or houseId, upsert, delete)
- Add more endpoints for Rental to be searched by userId or houseId

### 17/12/2021 (Phuong)

- Can update image in s3 by delete and upload more into the same folder
- Search/sort/pagination with name, type and price

### 17/12/2021 (Trang)

- All endpoints for Rental and Payment work (get all, get one, get and upsert by rentalId, add, delete, update, sort &
  pagination)
- **Weird POSTMAN issue:** after posting a new payment, getting all payments will show an ID and not the new Payment
  object; querying the new payment by ID and Rental still work as expected

### 16/12/2021 (Trang)

- All endpoints for AppUser work (get all, get one, add, delete, update, search, sort & pagination)
- All dates must use "yyyy-MM-dd" and all times must use "HH:mm"
- Some endpoints in UserController have been deleted, please check them out

### 16/12/2021 (Phuong)

- Added upload images using S3 bucket
- Change type of attribute `description` in class House
- Link to image url: https://realestatemgt.s3.ap-southeast-1.amazonaws.com/dataset/1/1_bathroom.jpg

> where 1 is the row id

- Pagination and sort with house and users, search by name with `house` and search by name/phone/email with `user`

### 4/12/2021 (Trang)

- Changed folder structure from class-based to function-based

> It is not necessary to create a Service for each Entity. A Service can wire multiple Repositories. This reduces the number of Services and makes cascading (for example delete all dependent Rentals when a User is deleted) easier. "Important" entities (User, House, Rental) have their own Service classes.

- Added 5 rows of mock data for all classes, relationships included
- Wrote parsers to parse date and time from strings
- Wrote a parser to deserialize field "rental" (actually an ID string) in `payment.json` into nested Rental objects
- Fixed infinite recursion when using GET requests for Rental and Payment due to them referencing each other
- Added manual cascading when deleting User and House: all dependent Deposits, Meetings, and Rentals will be deleted
- Added orphan removal when deleting Rental: all dependent Payments will be deleted

## Resources

### Lucid Chart

https://lucid.app/lucidchart/8ef05006-9512-4bab-966d-4d2ce853648d/edit?viewport_loc=-284%2C-7%2C2368%2C1080%2COIuwwrBRowku&invitationId=inv_b1fe5bc2-9d99-4deb-97a5-252d99acfae7
