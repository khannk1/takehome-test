# PlanEasy

## Project setup instructions
the IDE we use is Visual Studio Code. If you don't already have it installed you can grab it here: https://code.visualstudio.com/

 
<br />
**Windows:**

***Setting up the backend server***
1. Install the latest version of python onto your computer
2. Open an instance of command prompt or powershell (if you use powershell you will want to switch it to command prompt mode by typing cmd)
3. Navigate to the takehome-test\api folder
4. After python is installed, use pip to install the virtualenvwrapper for windows https://pypi.org/project/virtualenvwrapper-win/
5. Create a virtual envorinment to work off of for this take home test with mkvirtualenv takehome
    Note: any time you close the command prompt if you want to get back into the virtual envorinment you'll need to write workon takehome
      also, after you submit the take home test the virtual envorinment can be deleted with the command rmvirtualenv takehome
6. With your virtual envorinment activated run pip install -r requirements.txt to install the backend packages that the test uses
7. you can now run the backend server any time with python manage.py runserver (ensure you are in the virtual envorinment before running this command)

**Setting up the frontend server**
1. Install the LTS version of nodejs from  https://nodejs.org/en/
2. Install the yarn package manager https://classic.yarnpkg.com/en/
3. Open an additional instance of command prompt or powershell (if you use powershell you will want to switch it to command prompt mode by typing cmd)
4. Navigate to the takehome-test\src folder
5. run yarn to install the frontend packages that the test uses
6. you can now run the frontend server any time with yarn dev

<br />
<br />

**Mac:**
1. Install JS dependancies - `cd src && yarn install` (you may need to install yarn globally)
2. Create virtualenv for python deps - Make sure you are using python3.6 or later. Run `python -m venv venv` in the root directory. Activate virtual env by `source ./venv/bin/activate`
3. Install python packages - `cd api && pip install -r requirements.txt`
4. Run migrate to setup database `cd api && python manage.py migrate`
4. Run python server `cd api && python manage.py runserver`

**Graphql basics:**

Use a client like Insomnia to test GraphQL API with your data.

POST http://localhost:8000/graphql/


To get Family object with ID of 1
```
{
  family(id:1) {
    data
  }
}
```


To get all family objects
```
{
  allFamilies {
    data
  }
}
```

To modify the data with graphql mutation
```
mutation {
  sampleMutation(id:1, data:{"key":"value"}){
    family {
      id
      data
    }
  }
}
```

<br />

### Documentation

**Backend:**

Django tutorial refresher - [https://docs.djangoproject.com/en/3.0/intro/tutorial01/](https://docs.djangoproject.com/en/3.0/intro/tutorial01/)

Django ORM docs - [https://docs.djangoproject.com/en/3.0/topics/db/queries/](https://docs.djangoproject.com/en/3.0/topics/db/queries/)

Django Graphene (GraphQL server library) - [https://docs.graphene-python.org/projects/django/en/latest/](https://docs.graphene-python.org/projects/django/en/latest/)

**Frontend:**

ag-grid documentation - https://www.ag-grid.com/documentation-main/documentation.php

apollographql - https://www.apollographql.com/docs/react/data/mutations 


## Backend Tasks

- Create management script with in core app project
    - This script should parse the CSV file in the project
    - The CSV should be a mapped to a python array of objects, with the following structure
    - `{"year":"2020","month":"January","monthlyPayment":400,"lumpSumPayment":0,"interestRate":0.1999,"total":0, "edited": { "monthlyPayment": False, "lumpSumPayment": False, "interestRate": False }}`
    - The `edited` key and value can be the same for each row.
    - Create a new Family object and save the data to "rows" key in json field.
    - So you can access it like `family.data['rows']`

- Add button under table called "Recalculate Totals"
    - This button when pressed should call a custom mutation
    - This mutation should add together the Lump Sum Payment and Monthly Payment together and save it to Total Payment for each row.
- Add button under table called "Increase Monthly Payments"
    - This button pressed should called a custom mutation
    - This mutation should increment the Monthly Payment by 10% for every even row.
    - This mutation should also set the `monthlyPayment` field to true
    
<br />

**Backend Bonus Tasks:**

- Modify the increase monthly payments mutation to also recalculate the totals

<br />
<br />

 ## Frontend Tasks

 - Create the column definitions for the table by modifiyng the `tableColumns` variable in `index.js` you can find the correct key names by looking at the data inside of the `rowData` state variable
 - Create a button for each mutation you made on the backend and apply the updated rowData to the table (see apollographql doc link above)
    
<br /> 

**Frontend Bonus Tasks:**

- modify customStyle in index.js to change the colour of any cell that was marked as edited to red
- Use ag-charts to create any type of chart for the total value of each month
- Style the page however you see fit. You can use either css or bootstrap. Bootstrap and style.css are already linked up to be used for the page.

<br />
<br />
