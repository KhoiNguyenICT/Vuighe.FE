import { CustomLink, ConfigurationBaseKey, Menu } from 'types'
import { ConfigurationService } from 'app/core/services/configuration.service'
import { ToastrService } from 'ngx-toastr'
import { Component, OnInit, ViewChild } from '@angular/core'
import { TREE_ACTIONS, TreeComponent } from 'angular-tree-component'
import { DropdownSelectItemsComponent } from 'app/core/base/dropdown-select-items/dropdown-select-items.component'
import { remove } from 'lodash'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild(TreeComponent) tree: TreeComponent
  @ViewChild(DropdownSelectItemsComponent) dropdownSelectItemsComponent: DropdownSelectItemsComponent
  PageTitle = 'Menus'
  isExpand = false
  isLoading: boolean
  isShowDropdownSelectItemsComponent = false
  isToggle = {
    isToggleCategories: false,
    isTogglePages: false,
    isToggleFilms: false,
    isToggleEpisodes: false,
    isToggleNews: false,
    isToggleCustomLink: false
  }
  CustomLink: CustomLink
  nodes = []
  options = {
    allowDrag: true,
    allowDrop: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event)
          }
        }
      }
    }
  }

  constructor(
    private toastr: ToastrService,
    private configurationService: ConfigurationService
  ) { }

  ngOnInit() {
    this.buildTreeNodes()
  }

  get focusedNodeData() {
    return this.tree &&
      this.tree.treeModel &&
      this.tree.treeModel.focusedNode &&
      this.tree.treeModel.focusedNode.data
  }

  refeshTreeMenu() {
    this.tree.treeModel.update()
  }

  onMoveNode($event) {
    console.log($event)
  }

  onExpand() {
    this.isExpand = !this.isExpand
    if (this.isExpand) {
      this.tree.treeModel.expandAll()
    } else {
      this.tree.treeModel.collapseAll()
    }
  }

  onDeleteConfirmed() {
    const node = this.tree.treeModel.getActiveNode()
    if (node.isRoot) {
      const nodeIndex = this.nodes.findIndex(x => x.id === node.id)
      this.nodes.splice(nodeIndex, 1)
    } else {
      remove(node.parent.data.children, node.data)
      node.parent.data.hasChildren = false
      this.tree.treeModel.update()
      console.log(this.nodes)
    }
  }

  onSelectedItemCollumnRight(event) {
    const node = JSON.parse(event)
    this.nodes.push(node)
    this.refeshTreeMenu()
  }

  onSaveMenu() {
    const data = {
      'key': ConfigurationBaseKey.MenuSettings,
      'value': JSON.stringify(this.nodes)
    }
    const success = res => {
      this.refeshTreeMenu()
      this.toastr.success('Update menu successfully')
    }
    const error = res => {
      this.toastr.error(res.message)
    }
    this.configurationService.updateConfiguration(data).subscribe(success, error)
  }

  private buildTreeNodes() {
    this.isLoading = true
    const success = res => {
      this.isLoading = false
      this.nodes = JSON.parse(res.value)
      console.log(this.nodes)
      this.refeshTreeMenu()
    }
    const error = res => {
      this.isLoading = false
      this.toastr.error(res.message)
    }
    this.configurationService.getConfiguration(ConfigurationBaseKey.MenuSettings).subscribe(success, error)
  }

  onToggleDropdownSelectItem(openItemType) {
    switch (openItemType) {
      case 'Categories':
        this.isToggle.isToggleCategories = true
        this.isToggle.isTogglePages = false
        this.isToggle.isToggleFilms = false
        this.isToggle.isToggleEpisodes = false
        this.isToggle.isToggleNews = false
        this.isToggle.isToggleCustomLink = false
        break

      case 'Pages':
        this.isToggle.isToggleCategories = false
        this.isToggle.isTogglePages = true
        this.isToggle.isToggleFilms = false
        this.isToggle.isToggleEpisodes = false
        this.isToggle.isToggleNews = false
        this.isToggle.isToggleCustomLink = false
        break

      case 'Films':
        this.isToggle.isToggleCategories = false
        this.isToggle.isTogglePages = false
        this.isToggle.isToggleFilms = true
        this.isToggle.isToggleEpisodes = false
        this.isToggle.isToggleNews = false
        this.isToggle.isToggleCustomLink = false
        break

      case 'Episodes':
        this.isToggle.isToggleCategories = false
        this.isToggle.isTogglePages = false
        this.isToggle.isToggleFilms = false
        this.isToggle.isToggleEpisodes = true
        this.isToggle.isToggleNews = false
        this.isToggle.isToggleCustomLink = false
        break

      case 'News':
        this.isToggle.isToggleCategories = false
        this.isToggle.isTogglePages = false
        this.isToggle.isToggleFilms = false
        this.isToggle.isToggleEpisodes = false
        this.isToggle.isToggleNews = true
        this.isToggle.isToggleCustomLink = false
        break

      case 'CustomLink':
        this.isToggle.isToggleCategories = false
        this.isToggle.isTogglePages = false
        this.isToggle.isToggleFilms = false
        this.isToggle.isToggleEpisodes = false
        this.isToggle.isToggleNews = false
        this.isToggle.isToggleCustomLink = true
        break

      default:
        break
    }
  }

}
