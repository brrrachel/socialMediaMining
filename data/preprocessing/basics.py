import os
import csv
import datetime
import datedelta

step = datedelta.datedelta(months=1)
json_file = []


def _calculate_occurrences_for_file(file, account_name, id):
    print('Evaluate ', account_name)
    dates = []
    for row in file:
        try:
            date = datetime.datetime.strptime(row[3], '%Y-%m-%d')
            dates.append(date)
        except ValueError:
            continue

    current = datetime.datetime(year=2008, month=1, day=1)
    end = datetime.datetime(year=2019, month=12, day=1)
    while current < end:
        next = current + step

        counter = 0
        for date in dates:
            if current <= date < next:
                counter+=1

        def save_as_csv(identifier):
            with open(filename, 'a') as fp:
                wr = csv.writer(fp, dialect='excel')
                result = [adapt_AccountName(account_name), current.year, current.month, counter, identifier]
                wr.writerow(result)

        save_as_csv(id)
        id += 1
        current += step

    return id


def adapt_AccountName(account):
    if account == 'Gruenen':
        return 'Die_Gruenen'
    elif account == 'Fdp':
        return 'fdp'
    elif account == 'Spdde':
        return 'spdde'
    else:
        return account

def total_num_of_tweets():
    id = 0
    for file in os.listdir('data/translations/tweepyTweets'):
        with open('data/translations/tweepyTweets_unique/' + file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            underscore_index = file.find('_')
            result_index = file.find('Result.csv')
            account = file[underscore_index+1:result_index]
            id = _calculate_occurrences_for_file(csv_reader, account, id)
    for file in os.listdir('data/translations/twintTweets'):
        with open('data/translations/twintTweets_unique/' + file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            underscore_index = file.find('_')
            result_index = file.find('_tweets.csv')
            if not underscore_index == result_index:
                account = file[underscore_index+1:result_index]
            else:
                account = file[:result_index]
            id = _calculate_occurrences_for_file(csv_reader, account, id)


if __name__ == '__main__':
    os.chdir('../..')
    filename = 'setup/querys/total_num_of_tweets.csv'
    if os.path.exists(filename):
        os.remove(filename)
    total_num_of_tweets()
