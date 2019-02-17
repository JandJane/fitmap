#!/usr/bin/env python
# coding: utf-8

# In[28]:


import requests
import json

headers = {'Accept': '*/*', 'Origin': 'http://overpass-turbo.eu', 'Referer': 'http://overpass-turbo.eu/'}

overpass_url = "https://overpass.kumi.systems/api/interpreter"

query = """
[out:json];
area["ISO3166-1"="RU"][admin_level=2];

(node["leisure"="fitness_centre"](area);
node["leisure"="fitness_station"](area);
node["leisure"="sports_centre"](area);
node["leisure"="swimming_pool"](area);


node["shop"="health_food"](area);
node["shop"]["organic"](area);

node["shop"="bicycle"](area);
node["shop"="ski"](area);
node["shop"="sports"](area);
node["shop"="jetski"](area);
node["shop"="outdoor"](area);
node["shop"="scuba_diving"](area);

node["sport"](area);
);
out center;
"""

response = requests.get(overpass_url, 
                        params={'data': query})
data = response.json()


# In[31]:


print(len(data['elements']))


# In[ ]:


print(data)


# In[27]:




