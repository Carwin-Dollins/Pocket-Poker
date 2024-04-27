import os
import pandas as pd
from supabase import create_client, Client
import matplotlib.pyplot as plt

#requires you to do 
#pip3 install matplotlib 
#pip3 install pandas
#pip3 install supabase

#url and key for our database and then allowing ourselves to create a client object to make queries to the database

url = "https://hplnxayyijxebyklpoiz.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s"
supabase: Client = create_client(url, key)

hands = {"Royal Flush" : 100, "Straight Flush" : 90, "Four of a Kind" : 80, "Full House" : 70, "Flush" : 60, "Straight": 50, "Three of a Kind" : 40, "Two Pair" : 30, "One Pair" : 20, "High Card" : 10}

achFile = "achievements.csv"

#given the id we will generate a report for the player

def playerReport(u_id : int) -> int:
  
    wins = [0,0,0,0,0,0,0,0,0,0] #wins with a hand
    losses = [0,0,0,0,0,0,0,0,0,0] #losses on a hand
    handRate = [0,0,0,0,0,0,0,0,0,0] #win rates of hands

    #look for the player's wins/losses
    data = supabase.table("player_stats").select("wins, losses, level").eq("id", u_id).execute()
    
    if len(data.data) > 0: #make sure that we have data before we move forward
    
        #grab total games and level

        totalGames = data.data[0]["wins"] + data.data[0]["losses"]
        level = data.data[0]["level"]

        #get winrate

        if totalGames == 0: 
            winRate = 0
        else:
            winRate = data.data[0]["wins"] / totalGames

        winRate *= 100

    else:
        print("user has no records")

    #print(list(hands.keys()).index("flush")) to get the index of a dictionary entry
    data = supabase.table("transaction").select("winner_hand_id, prize_pool").eq("winner_id", u_id).execute()
    
    gains = 0
    gainsPerHand = [0,0,0,0,0,0,0,0,0,0]
    
    if len(data.data) > 0:
   
        #where we store points 

        points = 0
        
        for i in data.data: #this will work like norma we can just do val["wins or sum"]
        
            wins[i["winner_hand_id"]] += 1 #increment the wins of a certain hand
            points += list(hands.values())[i["winner_hand_id"]] #accumulate points
            gains += i["prize_pool"]
            gainsPerHand[i["winner_hand_id"]] += i["prize_pool"] 

        #update level if they are not max level

        if level < 100:
            level = int(points / (1500 * (level % 100)))

    else:
        print("user has no wins")

    data = supabase.table("transaction").select("losing_hand_id, prize_pool").eq("loser_id", u_id).execute()
    
    lostGains = 0
    lostGainsPerHand = [0,0,0,0,0,0,0,0,0,0]
    
    if len(data.data) > 0:
    
        for i in data.data:
            losses[i["losing_hand_id"]] += 1
            lostGains += i["prize_pool"]
            lostGainsPerHand[i["losing_hand_id"]] += i["prize_pool"]
    else:
        print("user has no losses")

    #if there are games available make graphs

    if totalGames != 0:
        
        #first we graph win rate per hand 

        for i in range(len(wins)):
            
            #error check so we dont divide by zero

            if losses[i] + wins[i] != 0:
                handRate[i] = wins[i] / ( losses[i] + wins[i]) * 100 #see winrate per specific hand
            else:
                handRate[i] = 0
        
        #graph for win rate 
        
        plt.figure(figsize = (20,10))
        plt.bar(list(hands.keys()), handRate, color = 'maroon', width = 0.4)
        plt.xlabel("Hands", fontsize = 20)
        plt.ylabel("Win Rate %", fontsize = 20)
        plt.xticks(fontsize = 13)
        plt.yticks(fontsize = 13)
        plt.title(f"Win rates given a hand \nOverall Win Rate {winRate}%", fontsize = 25)
        plt.savefig("playerHandWinRate.png")
        #plt.show() #for debugging
        
        #now make the earnings graph
        
        plt.figure(figsize = (20,10))
        plt.bar(list(hands.keys()), gainsPerHand, color = 'maroon', width = 0.4)
        plt.xlabel("Hands", fontsize = 20)
        plt.ylabel("Gains", fontsize = 20)
        plt.xticks(fontsize = 13)
        plt.yticks(fontsize = 13)
        plt.title(f"Earnings given a hand \nOverall earnings {gains}", fontsize = 25)
        plt.savefig("playerEarnings.png")
        #plt.show() #for debugging
        
        #now for losses graph

        plt.figure(figsize = (20,10))
        plt.bar(list(hands.keys()), lostGainsPerHand, color = 'maroon', width = 0.4)
        plt.xlabel("Hands", fontsize = 20)
        plt.ylabel("Lost Gains", fontsize = 20)
        plt.xticks(fontsize = 13)
        plt.yticks(fontsize = 13)
        plt.title(f"Gains lost given a hand \nOverall lost gains {lostGains}", fontsize = 25)
        plt.savefig("playerLosses.png")
        #plt.show() #for debugging

    else:
        print("no games to graph")
    
    checkCsv() #check if we have a csv file and create if needed
    checkAchievements(u_id, wins)

def dbReport():
    
    winRates = [] #individual rates given the hand
    globalWinRate = [] #win rates in comparison to other hands
    names = []
    totalGames = 0
    totalEarnings = 0
    earningRates = [] #how much currency  a hand wins compared to other hands
    
    #grab all our data

    data = supabase.table("game_wins").select("hand_name, hand_wins, hand_losses, earnings").execute()
    
    if len(data.data) > 0: #make sure that we have data before we move forward

        #individual stats per hand 

        for i in data.data:
        
            #sum up everything
            totalGames += i["hand_wins"] + i["hand_losses"]
            totalEarnings += i["earnings"]
        
            names.append(i["hand_name"]) #store names

            if (i["hand_wins"] + i["hand_losses"] == 0):
                winRates.append(0) #if no games then basically put its winrate as 0
            else: #otherwise append the real win rates
                winRates.append((i["hand_wins"] / (i["hand_wins"] + i["hand_losses"])) *  100 )
   
        #create table

        plt.figure(figsize = (20,10))
        plt.bar(names, winRates, color = 'maroon', width = 0.4)
        plt.xlabel("Hands")
        plt.ylabel("Win Rate %")
        plt.xticks(fontsize = 13)
        plt.yticks(fontsize = 13)
        plt.title("Win rates given a hand")
        plt.savefig("indWinRate.png")
        #plt.show() #for debugging

        for i in data.data:
        
            #calculate hands compared to all the other hands as a whole

            if totalGames == 0:
                globalWinRate.append(0)
            else:
                globalWinRate.append((i["hand_wins"]/ totalGames) * 100)
        
            #calculate global earnings 

            if totalEarnings == 0:
                earningRates.append(0)
            else:
                earningRates.append((i["earnings"]/ totalEarnings) * 100)

        #so we dont throw an error

        if totalGames != 0:

            #pie chart for globalwinrates

            plt.figure(figsize = (20,10))
            plt.pie(globalWinRate, labels = names,  autopct='%1.2f%%')
            plt.legend()
            plt.savefig("globalWinRates.png")
            #plt.show() #for debugging
    
        #so we dont throw an error 

        if totalEarnings != 0:

            #pie chart for earnings 
        
            plt.figure(figsize = (20,10))
            plt.pie(earningRates, labels = names,  autopct='%1.2f%%')
            plt.legend()
            plt.savefig("earningRates.png")
            #plt.show() #for debugging

    else:
        print("No Query data Returned")

#just makes sure we have a csv if not we just make a new one so our achievements dont error out

def checkCsv():
    
    #check if achievements exists and create if needed

    if os.path.isfile(achFile) != True:
        
        row = []
        achList = ["id"] #make the header for the achievement list
        
        for i in hands.keys():
            achList.append(i)
            achList.append("5 " + i)
       
        data = pd.DataFrame(row, columns= achList)
        data.to_csv(achFile, index = False)


#pretty much checks if a user is in our achievement list and updates their achievements into our spreadsheet

def checkAchievements(u_id, vals):

    #build up our achievements
    
    dat = [u_id]

    for i in vals:
        
        #check if they match achievements

        if i >=1: #if one win or more
            
            dat.append(1)
           
            if i >=5:#if 5 wins or more
               dat.append(1)
            else:
                dat.append(0)
        else: #neither so no achievements
            
            dat.append(0)
            dat.append(0)

    df = pd.read_csv(achFile) #read csv to a dataframe
    row = df.index[df['id'] == u_id].tolist() #turn it into a list that we can handle

    if not row: #if not in our csv file
        data = pd.DataFrame( [], columns = dat)
        data.to_csv(achFile, mode='a', index=False)
    else: #if in our csv file
        df.loc[row[0]] = dat
        df.to_csv(achFile, index = False)

