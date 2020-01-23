import psycopg2
import datetime
import csv

if __name__ == '__main__':

    years = range(2009, 2020)
    months = [(1,3), (4,6), (7,9), (10,12)]
    days = [(1,31), (1,30), (1,30), (1,31)]

    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="postgres")
    cursor = connection.cursor()

    for party in range(1, 32):
        for year in years:
            for i in range(len(months)):
                query_tweets = "select tweet from tweets where account_id = %s and (%s <= date) and (date <= %s)"
                from_date = datetime.date(year, months[i][0], days[i][0])
                to_date = datetime.date(year, months[i][1], days[i][1])
                cursor.execute(query_tweets, (party, from_date, to_date))

                result = cursor.fetchall()
                filename = str('fiveFactorFiles/' + str(party) + '_' + from_date.__str__() + '_' + to_date.__str__())

                if result:
                    with open(filename + '.csv', "w") as output:
                        writer = csv.writer(output, dialect='excel')
                        for row in result:
                            writer.writerow(row)
                else:
                    print('No data for party with id ' + str(party) + ' in ' + from_date.__str__() + ' until ' + to_date.__str__())

