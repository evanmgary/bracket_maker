# Reads a csv file with the following header names:
# name region seed bpi kenpom sagarin moore
# outputs a json with relevant information
import math

team_file = open("teamstats.csv", "r")
data = team_file.readlines()
headers = data[0].split(",")
data.pop(0)
output = "{\n\t"
# "Connecticut" : {"name" : "Connecticut", "region" : "W", "seed" : 4, bpi: 18.3},\n\t
for line in data:
    teamdata = line.split(",")
    item = f'"{teamdata[0]}" : {{"name": "{teamdata[0]}", "region" : "{teamdata[1][0]}", "seed" : "{teamdata[2]}", "b" : {teamdata[3]}, "k" : {teamdata[4]}, "s" : {teamdata[5]}, "m" : {teamdata[6]}}},' + '\n\t'
    output = output + item
output = output[:-3]
output = output + "\n}"
out_file = open('Teams.js', 'w')
out_file.write(output)
out_file.close()
team_file.close()

# Now going to make the bracket state object using some of the above information
# "1W1" : {"id" : "1W4", team : teams["Connecticut"], "pred1" : null, "pred2" : null, succ : "2W2""},\n\t
# In the above 1W1 means 1st round, W region, 4 seed. Predecessor node 1 and 2 are null, successor node is 2W2
# The succ values are placeholders, they will need to be entered manually later.
firstround = {1: 1, 2: 8, 3: 6, 4: 4, 5: 3, 6: 5, 7: 7, 8: 2, 9: 2, 10: 7, 11: 5, 12: 3, 13: 4, 14: 6, 15: 8, 16: 1}
output_2 = "{\n\t"
for line in data:
    teamdata = line.split(",")
    name = teamdata[0]
    region = teamdata[1][0]
    seed = int(teamdata[2])
    output_2 = output_2 + f'"1{region}{seed}" : {{"id" : "1{region}{seed}", "team" : "{name}", "pred1" : null, "pred2": null, "succ" : "2{region}{firstround[seed]}"}}' + ',\n\t'

# After this the slots for the later rounds need to be made. This file is only entering placeholder values for these, the actual ids need to be entered manually
ids2 = ["2S1", "2S2", "2S3", "2S4", "2S5", "2S6", "2S7", "2S8", "2E1", "2E2", "2E3", "2E4", "2E5", "2E6", "2E7", "2E8","2M1", "2M2", "2M3",\
 "2M4", "2M5", "2M6", "2M7", "2M8", "2W1", "2W2", "2W3", "2W4", "2W5", "2W6", "2W7", "2W8"]
ids3 = ["3S1", "3S2", "3S3", "3S4", "3E1", "3E2", "3E3", "3E4", "3M1", "3M2", "3M3", "3M4", "3W1", "3W2", "3W3", "3W4"]
ids4 = ["4S1", "4S2", "4E1", "4E2", "4M1", "4M2", "4W1", "4W2"]
ids5 = ["5S1", "5E1", "5M1", "5W1"]
idsf = ["6F1", "6F2", "7F1"]
secondround = {'1': [1, 16], '2': [8, 9], '3': [5, 12], '4': [4, 13], '5': [6, 11], '6': [3, 14], '7': [7, 10], '8': [2, 15]}
for i in range(32):
    output_2 = output_2 + f'"{ids2[i]}" : {{"id" : "{ids2[i]}", "team" : null, "pred1" : "1{ids2[i][1]}{secondround[ids2[i][2]][0]}", "pred2" : "1{ids2[i][1]}{secondround[ids2[i][2]][1]}", "succ" : "3{ids2[i][1]}{math.floor(((int(ids2[i][2]) - 1) / 2) + 1)}"}},' + '\n\t'
for i in range(16):
    output_2 = output_2 + f'"{ids3[i]}" : {{"id" : "{ids3[i]}", "team" : null, "pred1" : "2{ids3[i][1]}{int(ids3[i][2]) * 2 - 1}", "pred2" : "2{ids3[i][1]}{int(ids3[i][2]) * 2}", "succ" : "4{ids3[i][1]}{math.floor(((int(ids3[i][2]) - 1) / 2) + 1)}"}},' + '\n\t'
for i in range(8):
    output_2 = output_2 + f'"{ids4[i]}" : {{"id" : "{ids4[i]}", "team" : null, "pred1" : "3{ids4[i][1]}{int(ids4[i][2]) * 2 - 1}", "pred2" : "3{ids4[i][1]}{int(ids4[i][2]) * 2}", "succ" : "5{ids4[i][1]}{math.floor(((int(ids4[i][2]) - 1) / 2) + 1)}"}},' + '\n\t'
for i in range(4):
    output_2 = output_2 + f'"{ids5[i]}" : {{"id" : "{ids5[i]}", "team" : null, "pred1" : "4{ids5[i][1]}{int(ids5[i][2]) * 2 - 1}", "pred2" : "4{ids5[i][1]}{int(ids5[i][2]) * 2}", "succ" : "6{ids5[i][1]}{math.floor(((int(ids5[i][2]) - 1) / 2) + 1)}"}},' + '\n\t'
output_2 = output_2 + '"6F1" : {"id" : "6F1", "team" : null, "pred1" : "5S1", "pred2" : "5E1", "succ" : "7F1"},\n\t'
output_2 = output_2 + '"6F2" : {"id" : "6F2", "team" : null, "pred1" : "5M1", "pred2" : "5W1", "succ" : "7F1"},\n\t'
output_2 = output_2 + '"7F1" : {"id" : "7F1", "team" : null, "pred1" : "6F1", "pred2" : "6F2", "succ" : null},\n\t'
output_2 = output_2[:-3]
output_2 = output_2 + "\n}"
out_file_2 = open('InitState.js', 'w')
out_file_2.write(output_2)
out_file_2.close()