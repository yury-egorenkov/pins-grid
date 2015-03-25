
/*
 * -------------------------------------------------------
 * Project: Pins Grid
 * Version: 0.1.0
 *
 * Author:  Yury Egorenkov
 * Site:     http://ru.linkedin.com/in/yuryegorenkov
 * Contact: yury.egorenkov@gmail.com
 *
 *
 * Copyright (c) 2015 Yury Egorenkov
 * -------------------------------------------------------
 */

var ready=function(){};$(document).ready(ready),$(document).on("page:load",ready);var ready=function(){function add(a,b){return a+b}function removeClassByWildcard(el,wildcard){$(el).removeClass(function(index,css){var regex=new RegExp("(^|\\s)"+wildcard+"\\S+","g");return(css.match(regex)||[]).join(" ")})}function setColumns(columns){pinColumns=columns,classSwitch&&(removeClassByWildcard(".pins-grid","pins-grid-"),$(".pins-grid").addClass("pins-grid-"+columns))}function setPinChanger(media,columns){media.addListener(function(changed){changed.matches&&(setColumns(columns),rearrangePinsDelay())})}function addMediaQueryAction(query,columns){var media=window.matchMedia(query);media.matches&&setColumns(columns),setPinChanger(media,columns)}function addMaxWidthMedia(max,columns){var query="(max-width: "+max+")";addMediaQueryAction(query,columns)}function addMinWidthMedia(min,columns){var query="(min-width: "+min+")";addMediaQueryAction(query,columns)}function addMinMaxWidthMedia(min,max,columns){var query="(min-width: "+min+") and (max-width: "+max+")";addMediaQueryAction(query,columns)}function initSettings(settings){var s=settings;for(var i in s)0!=i?i!=s.length-1?addMinMaxWidthMedia(s[i-1].width,s[i].width,s[i].columns):addMinWidthMedia(s[i-1].width,s[i].columns):addMaxWidthMedia(s[i].width,s[i].columns)}function calculateHeightOfPreviousItemsInSameColumn(index){return getSameItems($(".pin"),pinColumns,index).map(function(d){return $(d).height()+marginTop}).reduce(add,0)}function translatePin(el,height){$(el).css({transform:"translate(0, "+height+"px)"}),setTimeout(function(){$(el).css({opacity:"1"})},500)}function rearrangePins(){$(".pin:visible").each(function(i,el){var heightCalculated=calculateHeightOfPreviousItemsInSameColumn(i),height=1==pinColumns?0:heightCalculated;translatePin(el,height)});var pins=$(".pin"),totalHeight=calculateHeightOfPreviousItemsInSameColumn(pins.length);totalHeight+=pins.last().height(),pins.last().parent().css("height",totalHeight)}function rearrangePinsDelay(){setTimeout(rearrangePins,700)}var marginTop=15,classSwitch=!0,inited=!1,defaultSettings=[{width:"768px",columns:1},{width:"992px",columns:3},{width:"1200px",columns:4},{width:"",columns:5}],pinColumns=1;window.getSameItems=function(array,column,index){for(var result=[],i=index-column;i>=0;i-=column)result.push(array[i]);return result},$(window).resize(function(){rearrangePins()}),window.pinGrid=function(settings){inited=!0,initSettings(settings),rearrangePinsDelay()},setTimeout(function(){inited||pinGrid(defaultSettings)},300)};$(document).ready(ready),$(document).on("page:load",ready);