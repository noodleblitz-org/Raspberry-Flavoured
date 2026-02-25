// priority: 0

const $MinecraftForge = Java.loadClass('net.minecraftforge.common.MinecraftForge')
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')
if ($KubeJS.startupScriptManager.firstLoad) {
  $MinecraftForge.EVENT_BUS.addListener($EventPriority.LOW, false, Java.loadClass('net.minecraftforge.event.entity.player.ItemTooltipEvent'), event => global.tooltips(event))
}

// blacklisted tooltips
const blacklist = [
	"tooltip.storagedrawers.drawers.capacity",
	"item.storagedrawers.drawer_key.desc",
];

// remove blacklisted tooltips
global.tooltips = (event) => {
    for(let i of blacklist) {
        let blacklisted = Text.translate(i).string;
        event.toolTip.removeIf(comp => comp.toFlatList().stream().anyMatch(flatComp => flatComp.string.includes(blacklisted)));
    }
}