import csv
import psycopg2
import re


data = []
with open('LIWC_results.csv', newline='') as csvFile:
    data = list(csv.reader(csvFile))

connection = psycopg2.connect(user="postgres",
                              password="postgres",
                              host="localhost",
                              port="5432",
                              database="postgres")
cursor = connection.cursor()
query_tweets = "select * from accounts, parties where accounts.party_id = parties.id"
cursor.execute(query_tweets)
result = cursor.fetchall()

cdu = []
csu = []
fdp = []
gruene = []
spd = []
linke = []
afd = []

regexp_account_id = re.compile("\d+(?=_)")
ids = []
for liwc_results in data:
    file_id = liwc_results[0]
    account_id = regexp_account_id.match(file_id)
    if account_id:
        try:
            ids.append(account_id.group(0))
            party_name = result[int(account_id.group(0))-1][7]
            if party_name == "SPD":
                spd.append(liwc_results)
            elif party_name == "AfD":
                afd.append(liwc_results)
            elif party_name == "CDU":
                cdu.append(liwc_results)
            elif party_name == "Die Gruenen":
                gruene.append(liwc_results)
            elif party_name == "Die Linke":
                linke.append(liwc_results)
            elif party_name == "FDP":
                fdp.append(liwc_results)
            elif party_name == "CSU":
                csu.append(liwc_results)
        except IndexError:
            print(result[int(account_id.group(0))-1])

num_cdu = 4
cdu_combined = {}
num_csu = 3
csu_combined = {}
num_fdp = 3
fdp_combined = {}
num_gruene = 5
gruene_combined = {}
num_linke = 5
linke_combined = {}
num_spd = 5
spd_combined = {}
num_afd = 6
afd_combined = {}

regexp_timestamp = re.compile("(?<=\d_)[\d\-_]+")
for entry in cdu:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in cdu_combined:
        current_values = cdu_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        cdu_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        cdu_combined[timestamp] = new_values

for timestamp_key in cdu_combined.keys():
    average = []
    for feature in cdu_combined[timestamp_key]:
        average.append(feature / num_cdu)
    cdu_combined[timestamp_key] = average

for entry in csu:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in csu_combined:
        current_values = csu_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        csu_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        csu_combined[timestamp] = new_values

for timestamp_key in csu_combined.keys():
    average = []
    for feature in csu_combined[timestamp_key]:
        average.append(feature / num_csu)
    csu_combined[timestamp_key] = average

for entry in fdp:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in fdp_combined:
        current_values = fdp_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        fdp_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        fdp_combined[timestamp] = new_values

for timestamp_key in fdp_combined.keys():
    average = []
    for feature in fdp_combined[timestamp_key]:
        average.append(feature / num_fdp)
    fdp_combined[timestamp_key] = average

for entry in gruene:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in gruene_combined:
        current_values = gruene_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        gruene_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        gruene_combined[timestamp] = new_values

for timestamp_key in gruene_combined.keys():
    average = []
    for feature in gruene_combined[timestamp_key]:
        average.append(feature / num_gruene)
    gruene_combined[timestamp_key] = average

for entry in linke:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in linke_combined:
        current_values = linke_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        linke_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        linke_combined[timestamp] = new_values

for timestamp_key in linke_combined.keys():
    average = []
    for feature in linke_combined[timestamp_key]:
        average.append(feature / num_linke)
    linke_combined[timestamp_key] = average

for entry in afd:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in afd_combined:
        current_values = afd_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        afd_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        afd_combined[timestamp] = new_values

for timestamp_key in afd_combined.keys():
    average = []
    for feature in afd_combined[timestamp_key]:
        average.append(feature / num_afd)
    afd_combined[timestamp_key] = average

for entry in spd:
    file_id = str(entry[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0)
    if timestamp in spd_combined:
        current_values = spd_combined[timestamp]
        new_values = []
        for i in range(0, len(entry)-2):
            new_values.append(float(current_values[i]) + float(entry[i+1]))
        spd_combined[timestamp] = new_values
    else:
        new_values = []
        for i in range(1, len(entry)-1):
            new_values.append(float(entry[i]))
        spd_combined[timestamp] = new_values

for timestamp_key in spd_combined.keys():
    average = []
    for feature in spd_combined[timestamp_key]:
        average.append(feature / num_spd)
    spd_combined[timestamp_key] = average


with open('cdu_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in cdu_combined.items():
        writer.writerow([key, value])
    csv_file.close()

with open('csu_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in csu_combined.items():
        writer.writerow([key, value])
    csv_file.close()

with open('fdp_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in fdp_combined.items():
        writer.writerow([key, value])
    csv_file.close()

with open('spd_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in spd_combined.items():
        writer.writerow([key, value])
    csv_file.close()

with open('gruene_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in gruene_combined.items():
        writer.writerow([key, value])
    csv_file.close()

with open('linke_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in linke_combined.items():
        writer.writerow([key, value])
    csv_file.close()

with open('afd_combined.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow("Filename",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth',"OtherP")
    for key, value in afd_combined.items():
        writer.writerow([key, value])
    csv_file.close()