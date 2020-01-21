import psycopg2
import datetime
import csv

if __name__ == '__main__':

    years = range(2009, 2020)
    month = [(1,3), (4,6), (7,9), (10,12)]

    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="postgres")
    cursor = connection.cursor()

    for party in range(1, 32):
        for year in years:
            for (from_month, end_month) in month:
                query_tweets = "select tweet from tweets where account_id = %s and (%s <= date) and (date < %s)"
                cursor.execute(query_tweets, (party, datetime.date(year, from_month, 1), datetime.date(year, end_month, 1)))

                result = cursor.fetchall()
                filename = str('fiveFactorFiles/' + str(party) + '_' + datetime.date(year, from_month, 1).__str__() + '_' + datetime.date(year, end_month, 1).__str__())

                if result:
                    with open(filename + '.csv', "w") as output:
                        writer = csv.writer(output, dialect='excel')
                        for row in result:
                            writer.writerow(row)
                else:
                    print('No data for party with id ' + str(party) + 'in ' + datetime.date(year, from_month, 1).__str__() + ' until ' + datetime.date(year, end_month, 1).__str__())

