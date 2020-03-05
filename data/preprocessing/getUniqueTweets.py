import csv, os

if __name__ == '__main__':
    for file in os.listdir('../translation/tweepyTweets'):
        print(file)
        with open('./tweepyTweets/' + file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            with open('./tweepyTweets_unique/' + file, "w") as output:
                writer = csv.writer(output, dialect='excel')
                id = []
                for row in csv_reader:
                    if not row[0] in id:
                        writer.writerow(row)
                        id.append(row[0])

    for file in os.listdir('../translation/twintTweets'):
        print(file)
        with open('./twintTweets/' + file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            with open('./twintTweets_unique/' + file, "w") as output:
                writer = csv.writer(output, dialect='excel')
                id = []
                for row in csv_reader:
                    if not row[0] in id:
                        writer.writerow(row)
                        id.append(row[0])
