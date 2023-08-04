# Reads a csv file with the following header names:
# name region seed bpi kenpom sagarin moore
# outputs a json with relevant information

team_file = open("teamstats.csv", "r")
data = file.readline()
headers = data[0].split(",")
data.remove(0)
output = "teams = {\n\t"
# "Connecticut" : {"name" : "Connecticut", "region" : "W", "seed" : 4, bpi: 18.3},\n\t
for line in data:
    teamdata = line.split(",")
    item = f'"{line[0]}" : {{"name": "{line[0]}", "region" : "{line[1][0]}", "seed" : "{line[2]}", "bpi" : {line[3]}, "kenpom" : {line[4]}, "sagarin" : {line[5]}, "moore" : {line[6]}}},' + '\n\t'
    output = output + item
output = output[:-3]
output = output + "\n}"
out_file = file.open('Teams.json', 'w')
out_file.write(output)
out_file.close()
team_file.close()

# Now going to make the bracket state object using some of the above information
# "1W1" : {"id" : "1W4", team : teams["Connecticut"], "pred1" : null, "pred2" : null, succ : "2W2""},\n\t
# In the above 1W1 means 1st round, W region, 4 seed. Predecessor node 1 and 2 are null, successor node is 2W2
# The succ values are placeholders, they will need to be entered manually later.
output_2 = "bracket_state = {\n\t"
for line in data:
    name = line[0]
    region = line[1][0]
    seed = line[2]
    output_2 = output_2 + f'{{"1{region}{seed}" : "team" : "{name}", "pred1" : null, "pred2": null, "succ" : "#N#"}}'

# After this the slots for the later rounds need to be made. This file is only entering placeholder values for these, the actual ids need to be entered manually
for i in range(63):
    output_2 = output_2 + f'"#R#" : {{id : "#N#", team : null, "pred1" : "#N#", "pred2" : "#N#", "succ" : "#N#"}},' + '\n\t'
output_2 = output_2[:-3]
output_2 = output_2 + "\n}"
out_file_2 = file.open('InitState.json', 'w')
out_file_2.write(output_2)
out_file_2.close()