<template>
  <div class="filter-form-box">
    <el-form class="form-box" id="filterFilter" :model="formFilter" ref="formFilterRef" label-width="120px">
      <el-row :gutter="16">
        <el-col v-for="(item, index) in itemList" :key="index" :span="8">
          <el-form-item :label="item.label">
            <el-input v-if="item.itemType === 'input'" :placeholder="'请输入' + item.label" clearable @input="filter"
              v-model="formFilter[item.value]"></el-input>
            <el-select v-if="item.itemType === 'select' && !item.dictOptions" v-model="formFilter[item.value]" clearable
              @change="filter" :placeholder="'请选择' + item.label">
              <el-option :label="optionsItem.label" :value="optionsItem.value"
                v-for="(optionsItem, optionsIndex) in item.options" :key="optionsIndex"></el-option>
            </el-select>
            <el-select v-if="item.itemType === 'select' && item.dictOptions" v-model="formFilter[item.value]" clearable
              filterable @change="filter" :placeholder="'请选择' + item.label">
              <el-option :label="optionsItem.label" :value="optionsItem.value"
                v-for="(optionsItem, optionsIndex) in selectOptions[item.dictOptions]" :key="optionsIndex"></el-option>
            </el-select>
            <el-date-picker v-if="item.itemType === 'datePicker'" v-model="dateValue" @change="changeDateValue"
              type="datetimerange" clearable value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="buttons-box">
      <el-button type="" @click="resetFilter">重置</el-button>
      <el-button type="text" v-if="collapsiable" @click="onExpand">
        {{ isExpand ? '收起' : '展开' }}
        <i class="pix-icon-down fold" :class="isExpand ? 'rotate-0' : 'rotate-180'"></i></el-button>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
export default {
  name: 'connector-config-filter',
  mounted() {
    this.minShowCtrol()
  },
  props: {
    filterList: Array
  },
  computed: {
    itemList() {
      return this.filterList
    }
  },
  data() {
    return {
      maxShow: 3,
      isExpand: false,
      dateValue: [],
      collapsiable: false, // 是否显示收起展开按钮
      formFilter: {},
      selectOptions: {}
    }
  },
  created() {
    this.getSelectOptions()
  },
  methods: {
    getFilterParams() {
      return this.formFilter
    },
    getSelectOptions() {
      this.filterList.map(async item => {
        if (item.dictOptions) {
          let optionList = []
          const getDicts = await $ipaas.store.dispatch('new_dict/getDicts', item.dictOptions)
          getDicts.map(item => {
            const obj = {
              value: item.type,
              label: item.desc
            }
            optionList.push(obj)
          })
          if (typeof item.filterOptions === 'function') {
            optionList = item.filterOptions(optionList)
          }
          this.$set(this.selectOptions, [item.dictOptions], optionList)
        }
      })
    },
    changeDateValue() {
      if (this.dateValue && this.dateValue.length > 0) {
        this.formFilter.startTime = this.dateValue[0]
        this.formFilter.endTime = this.dateValue[1]
      } else {
        this.formFilter.startTime = ''
        this.formFilter.endTime = ''
      }
      this.filter()
    },
    onExpand() {
      this.isExpand = !this.isExpand
      this.minShowCtrol()
    },
    resetFilter() {
      this.$refs.formFilterRef.resetFields()
      this.formFilter = {}
      this.dateValue = []
      this.filter()
    },
    filter() {
      this.$emit('filter')
    },
    // 通过控制元素显示/折叠
    minShowCtrol() {
      const group = window.document.querySelectorAll(`#filterFilter .el-form-item`)
      const len = this.itemList.length
      if (this.maxShow < len) {
        group.forEach((item, index) => {
          if (index > this.maxShow - 1 && index < len) {
            item.hidden = !this.isExpand
          }
        })
        this.collapsiable = true
      } else {
        this.collapsiable = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-form-box {
  display: flex;

  .form-box {
    flex: 1;
    margin-right: 18px;
  }

  .fold {
    font-size: 12px;
    display: inline-block;
    bottom: 1px;
    margin-left: 3px;
  }

  .el-input__inner {
    width: 100%;
  }
}

.buttons-box {
  ::v-deep .el-button--text {
    color: #73777c;
  }
}
</style>