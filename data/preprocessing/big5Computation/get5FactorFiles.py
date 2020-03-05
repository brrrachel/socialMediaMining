import psycopg2
import datetime
import csv
import os
import shutil

if __name__ == '__main__':

    if os.path.exists('fiveFactorFilesForLIWC/'):
        shutil.rmtree('fiveFactorFilesForLIWC/')
        os.mkdir('fiveFactorFilesForLIWC/')

    years = range(2009, 2020)
    months = [(1, 3), (4, 6), (7, 9), (10, 12)]
    days = [(1, 31), (1, 30), (1, 30), (1, 31)]

    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="postgres")
    cursor = connection.cursor()

    # for each account collect all tweets per quarter and combine them in one file
    for account in range(1, 32):
        for year in years:
            for i in range(len(months)):
                query_tweets = "select tweet from tweets where account_id = %s and (%s <= date) and (date <= %s)"
                from_date = datetime.date(year, months[i][0], days[i][0])
                to_date = datetime.date(year, months[i][1], days[i][1])
                cursor.execute(query_tweets, (account, from_date, to_date))

                result = cursor.fetchall()
                filename = str(account) + '_' + from_date.__str__() + '_' + to_date.__str__() + '.csv'

                # save results in file named after account_id, start date and end date
                if result:
                    with open('fiveFactorFilesForLIWC/' + filename, "w") as output:
                        writer = csv.writer(output, dialect='excel')
                        for row in result:
                            writer.writerow(row)
                else:
                    print('No data for party with id ' + str(account) + ' in ' + from_date.__str__() + ' until ' + to_date.__str__())

