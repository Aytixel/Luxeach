#!/usr/bin/python3.4
# -*- coding: utf-8 -*-
from threading import Thread, current_thread
import time
import requests
from bs4 import BeautifulSoup
import pymysql.cursors

#varibles
connection = pymysql.connect(host='localhost', user='root', password='aytixel72110', db='luxeach_database', charset='utf8', cursorclass=pymysql.cursors.DictCursor)
threads = []
results = []

#print
def _print_(message):
    if 0:
        print('[' + current_thread().name + '] ' + message)

#worker
class Worker(Thread):
    
    def __init__(self, worker_update_list):
        Thread.__init__(self)
        self.update_list = worker_update_list
        
    def run(self):
        for result in self.update_list:
            url = result['url']
            
            _print_('gathering information for update of: ' + url)
                
            try:
                req_html = requests.get(url)
                
                if req_html.status_code == requests.codes.ok:
                    _print_(url + ' reply: ' + str(req_html.status_code))
                    _print_(url + ' is encode in: ' + req_html.encoding)

                    page = req_html.content.decode(req_html.encoding)
                    dom = BeautifulSoup(page, 'html5lib')

                    title = ""
                    description = ""

                    if len(dom.title.string) < 256: title = dom.title.string
                    else: title = dom.title.string[:255]

                    for meta in dom.find_all('meta'):
                        meta_prepared = str(meta).lower().replace(" ","").replace("\'","\"")

                        if meta_prepared.find('name="description"') != -1 or meta_prepared.find('property="og:description"') != -1 or meta_prepared.find('property="twitter:description"') != -1: description = meta.attrs['content']

                    _print_('update mysql information of: ' + url)

                    with connection.cursor() as req:
                        try:
                            sql = 'UPDATE url_bank SET title = "%s", description = "%s", is_new = 0, update_time = NOW() WHERE url = "%s"' % (title, description, url)
                            req.execute(sql)
                            connection.commit()
                        except pymysql.Error:  
                            _print_('Error: can\'t update mysql infomation of: ' + url)
                else:
                    _print_('Error: can\'t gather information of: ' + url + ' because it reply: ' + str(req_html.status_code))
            except requests.exceptions.RequestException:
                _print_('Error: can\'t gather information of: ' + url)

#main
_print_('update database with old page')
     
with connection.cursor() as req:
    try:
        req.execute('SELECT url FROM url_bank ORDER BY update_time DESC')

        if req.rowcount > 0:
            results = req.fetchall();

            for index, worker_update_list in enumerate([results[i::4] for i in range(4)]):
                threads.append(Worker(worker_update_list))
                threads[index].start()
                
            for thread in threads:
                thread.join()
    except pymysql.Error:
        _print_('Error: can\'t get old page')
    
